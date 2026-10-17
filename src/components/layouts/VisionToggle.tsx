"use client";

import { Eye } from "lucide-react";
import { useState } from "react";

export function VisionToggle() {
  const [on, setOn] = useState(false);
  const toggle = () => {
    const next = !on;
    document.documentElement.classList.toggle("a11y-vision", next);
    setOn(next);
  };
  return (
    <button type="button" onClick={toggle} aria-pressed={on} className="flex items-center gap-2 text-xs transition hover:text-brand">
      <Eye size={16} /> Версия для слабовидящих
    </button>
  );
}
