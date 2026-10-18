// scrape-assets.mjs — выгрузка картинок, текстов и эталонных скриншотов с https://ibic.clinic
// Запуск (на машине с доступом к сайту), из корня проекта:
//   npm i -D playwright sharp && npx playwright install chromium
//   node scripts/scrape-assets.mjs
// Результат: ./scraped/{raw,optimized,screens,text,icons}/ + manifest.json + manifest.csv

import { chromium } from 'playwright';
import sharp from 'sharp';
import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';

const ORIGIN = 'https://ibic.clinic';
const OUT = path.resolve('scraped');
const WIDTHS = [1440, 390];               // десктоп + мобильный
const SIZES = [480, 960, 1600];           // ширины оптимизированных версий
const SEED = [
  '/', '/about/', '/services/', '/prices/', '/doctors/', '/promo/', '/contacts/',
  '/clinics/golovnoy-ofis/', '/doctors/ibragimov-ibragim-guseynovich/',
];
// секции-остатки чужого шаблона — помечаем hidden
const JUNK_SECTIONS = ['sharing-thumbs', 'sharing'];
const MAX_PAGES = 80;

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const slug = (s) => (s || '').toLowerCase()
  .replace(/[^a-z0-9а-яё]+/gi, '-').replace(/^-+|-+$/g, '').slice(0, 60) || 'img';
const pageSlug = (p) => (p === '/' ? 'home' : p.replace(/^\/|\/$/g, '').replace(/\//g, '__'));

async function ensureDirs() {
  for (const d of ['raw', 'optimized', 'screens', 'text', 'icons'])
    await fs.mkdir(path.join(OUT, d), { recursive: true });
}

async function autoScroll(page) {
  await page.evaluate(async () => {
    const step = innerHeight * 0.7;
    for (let y = 0; y < document.body.scrollHeight; y += step) {
      scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 250));
    }
    scrollTo(0, 0);
  });
  await sleep(800);
}

// Собираем всё, что похоже на картинку, + контекст
async function collect(page) {
  return page.evaluate((JUNK) => {
    const abs = (u) => { try { return new URL(u, location.href).href; } catch { return null; } };
    const sectionOf = (el) => {
      let p = el;
      while (p && p !== document.body) {
        const c = (p.className && typeof p.className === 'string') ? p.className : '';
        if (p.parentElement && (p.parentElement.tagName === 'MAIN' || p.parentElement.classList.contains('content')) && c)
          return c.split(/\s+/)[0];
        if (['HEADER', 'FOOTER'].includes(p.tagName)) return p.tagName.toLowerCase();
        p = p.parentElement;
      }
      return 'other';
    };
    const heading = (el) => {
      let p = el;
      for (let i = 0; i < 6 && p; i++, p = p.parentElement) {
        const h = p.querySelector?.('h1,h2,h3,[class*="title"],[class*="name"]');
        if (h && h.textContent.trim()) return h.textContent.trim().replace(/\s+/g, ' ').slice(0, 80);
      }
      return '';
    };
    const isJunk = (el) => JUNK.some((j) => el.closest(`[class*="${j}"]`));
    const out = [];
    const push = (url, el, kind) => {
      if (!url) return;
      const r = el.getBoundingClientRect();
      out.push({
        url, kind,
        alt: el.getAttribute?.('alt') || '',
        section: sectionOf(el),
        heading: heading(el),
        displayW: Math.round(r.width), displayH: Math.round(r.height),
        hidden: isJunk(el) || (el.offsetParent === null && kind !== 'link'),
      });
    };
    document.querySelectorAll('img').forEach((i) => {
      push(abs(i.getAttribute('data-src')), i, 'img');
      push(abs(i.currentSrc || i.getAttribute('src')), i, 'img');
      (i.getAttribute('srcset') || i.getAttribute('data-srcset') || '').split(',')
        .map((s) => s.trim().split(' ')[0]).filter(Boolean).forEach((u) => push(abs(u), i, 'srcset'));
    });
    document.querySelectorAll('source[srcset],source[data-srcset]').forEach((s) =>
      (s.getAttribute('srcset') || s.getAttribute('data-srcset')).split(',')
        .map((x) => x.trim().split(' ')[0]).forEach((u) => push(abs(u), s, 'source')));
    document.querySelectorAll('[data-background-image],[data-bg]').forEach((e) =>
      push(abs(e.getAttribute('data-background-image') || e.getAttribute('data-bg')), e, 'data-bg'));
    document.querySelectorAll('a[href]').forEach((a) => {
      if (/\.(jpe?g|png|webp|gif|svg|avif)(\?|$)/i.test(a.href)) push(a.href, a, 'link');
    });
    const svgs = [];
    document.querySelectorAll('*').forEach((e) => {
      const bg = getComputedStyle(e).backgroundImage;
      if (!bg || bg === 'none') return;
      for (const m of bg.matchAll(/url\(["']?(.*?)["']?\)/g)) {
        if (m[1].startsWith('data:image/svg')) svgs.push({ data: m[1], cls: (e.className + '').split(/\s+/)[0] || e.tagName });
        else push(abs(m[1]), e, 'css-bg');
      }
    });
    const og = document.querySelector('meta[property="og:image"]')?.content;
    if (og) out.push({ url: abs(og), kind: 'og', section: 'meta', alt: '', heading: '', hidden: false });
    document.querySelectorAll('link[rel*="icon"]').forEach((l) =>
      out.push({ url: abs(l.href), kind: 'favicon', section: 'meta', alt: '', heading: '', hidden: false }));
    const links = [...document.querySelectorAll('a[href]')]
      .map((a) => a.href).filter((h) => h.startsWith(location.origin))
      .map((h) => new URL(h).pathname).filter((p) => !/\.(php|jpe?g|png|pdf|svg|webp)$/i.test(p));
    return { images: out, svgs, links: [...new Set(links)] };
  }, JUNK_SECTIONS);
}

// Тексты секций (отзывы, оборудование, образование и т.д.) — чтобы не перепечатывать руками
async function collectText(page) {
  return page.evaluate(() => {
    const root = document.querySelector('main') || document.body;
    const blocks = [...root.querySelectorAll(':scope > *, .content > *')]
      .filter((e) => e.offsetHeight > 20)
      .map((e) => ({
        section: (e.className + '').split(/\s+/)[0] || e.tagName,
        text: e.innerText.trim(),
        slides: [...e.querySelectorAll('.swiper-slide:not(.swiper-slide-duplicate)')]
          .map((s) => s.innerText.trim()).filter(Boolean),
      }));
    return {
      title: document.title,
      description: document.querySelector('meta[name="description"]')?.content || '',
      h1: document.querySelector('h1')?.innerText.trim() || '',
      blocks,
    };
  });
}

// /upload/resize_cache/iblock/877/1840_1660_1/hash.JPG -> /upload/iblock/877/hash.JPG
const originalCandidate = (u) => {
  const x = new URL(u);
  const m = x.pathname.match(/^\/upload\/resize_cache\/(.+?)\/\d+_\d+_\d+\/(.+)$/);
  return m ? `${x.origin}/upload/${m[1]}/${m[2]}` : null;
};

async function fetchBuf(url) {
  const r = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0 asset-migration' } });
  if (!r.ok) throw new Error(`${r.status} ${url}`);
  return Buffer.from(await r.arrayBuffer());
}

async function main() {
  await ensureDirs();
  const browser = await chromium.launch();
  const queue = [...SEED];
  const seen = new Set();
  const found = new Map();   // url -> {meta, pages:Set}
  const icons = new Map();   // data-uri -> cls

  while (queue.length && seen.size < MAX_PAGES) {
    const p = queue.shift();
    if (seen.has(p)) continue;
    seen.add(p);
    for (const w of WIDTHS) {
      const ctx = await browser.newContext({ viewport: { width: w, height: 900 }, deviceScaleFactor: 1 });
      const page = await ctx.newPage();
      try {
        await page.goto(ORIGIN + p, { waitUntil: 'networkidle', timeout: 60000 });
        await autoScroll(page);
        const { images, svgs, links } = await collect(page);
        for (const im of images) {
          if (!im.url || !/^https?:/.test(im.url)) continue;
          const cur = found.get(im.url) || { ...im, pages: new Set(), widths: new Set() };
          cur.pages.add(p); cur.widths.add(w);
          cur.hidden = cur.hidden && im.hidden; // видна хоть где-то — значит не hidden
          found.set(im.url, cur);
        }
        svgs.forEach((s) => icons.set(s.data, s.cls));
        if (w === WIDTHS[0]) {
          links.forEach((l) => { if (!seen.has(l)) queue.push(l); });
          const text = await collectText(page);
          await fs.writeFile(path.join(OUT, 'text', `${pageSlug(p)}.json`), JSON.stringify(text, null, 2));
        }
        await page.screenshot({ path: path.join(OUT, 'screens', `${pageSlug(p)}-${w}.png`), fullPage: true });
        console.log('✓', p, w, images.length, 'imgs');
      } catch (e) {
        console.warn('✗', p, w, e.message);
      }
      await ctx.close();
    }
  }
  await browser.close();

  // Скачивание + оптимизация
  const manifest = [];
  const byHash = new Map();
  for (const [url, meta] of found) {
    let buf, usedUrl = url, original = false;
    const orig = originalCandidate(url);
    try {
      if (orig) { try { buf = await fetchBuf(orig); usedUrl = orig; original = true; } catch { /* фолбэк */ } }
      if (!buf) buf = await fetchBuf(url);
    } catch (e) { console.warn('download fail', url, e.message); continue; }

    const hash = crypto.createHash('sha1').update(buf).digest('hex').slice(0, 10);
    const ext = (path.extname(new URL(usedUrl).pathname) || '.bin').toLowerCase();
    const base = `${slug(meta.section)}--${slug(meta.alt || meta.heading || path.basename(usedUrl, ext))}--${hash}`;
    const entry = {
      source: url, downloaded: usedUrl, original, hash, file: `raw/${base}${ext}`,
      section: meta.section, alt: meta.alt, heading: meta.heading, kind: meta.kind,
      pages: [...meta.pages], seenAt: [...meta.widths], hidden: !!meta.hidden,
      displayW: meta.displayW, displayH: meta.displayH,
    };
    if (byHash.has(hash)) { byHash.get(hash).duplicates.push(url); continue; }
    entry.duplicates = [];
    await fs.writeFile(path.join(OUT, entry.file), buf);

    if (/\.(jpe?g|png|webp|avif|gif)$/i.test(ext)) {
      try {
        const img = sharp(buf, { failOn: 'none' }).rotate();
        const { width, height } = await img.metadata();
        entry.width = width; entry.height = height; entry.variants = [];
        const dir = path.join(OUT, 'optimized', slug(meta.section));
        await fs.mkdir(dir, { recursive: true });
        for (const s of SIZES.filter((s) => s <= width).concat(width < SIZES[0] ? [width] : [])) {
          for (const fmt of ['webp', 'avif']) {
            const f = path.join(dir, `${base}-${s}.${fmt}`);
            await sharp(buf).rotate().resize({ width: s, withoutEnlargement: true })[fmt]({ quality: fmt === 'avif' ? 50 : 78 }).toFile(f);
            entry.variants.push(path.relative(OUT, f));
          }
        }
      } catch (e) { entry.error = e.message; }
    }
    byHash.set(hash, entry);
    manifest.push(entry);
  }

  // data-URI SVG иконки → файлы
  let i = 0;
  for (const [data, cls] of icons) {
    const svg = decodeURIComponent(data.replace(/^data:image\/svg\+xml(;charset=[^,;]+)?(;utf8)?,/, ''));
    const f = `icons/${slug(cls)}-${++i}.svg`;
    await fs.writeFile(path.join(OUT, f), svg);
    manifest.push({ source: 'data-uri', file: f, section: 'icons', kind: 'svg-icon', heading: cls, pages: [], hidden: false });
  }

  await fs.writeFile(path.join(OUT, 'manifest.json'), JSON.stringify(manifest, null, 2));
  const csv = ['file,section,alt,heading,pages,width,height,original,hidden,source']
    .concat(manifest.map((m) => [m.file, m.section, m.alt, m.heading, (m.pages || []).join(' '), m.width || '', m.height || '', m.original ? 1 : 0, m.hidden ? 1 : 0, m.source]
      .map((v) => `"${String(v ?? '').replace(/"/g, '""')}"`).join(',')));
  await fs.writeFile(path.join(OUT, 'manifest.csv'), '﻿' + csv.join('\n'));
  console.log(`\nГотово: ${manifest.length} файлов, страниц обойдено: ${seen.size}. См. scraped/manifest.csv`);
}

main().catch((e) => { console.error(e); process.exit(1); });
