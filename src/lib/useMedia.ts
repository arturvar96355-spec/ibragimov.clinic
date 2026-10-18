import { useSyncExternalStore } from "react";

/** Совпадение медиазапроса без гидрационных расхождений: на сервере и при гидрации false. */
export function useMedia(query: string): boolean {
  return useSyncExternalStore(
    (cb) => {
      const m = window.matchMedia(query);
      m.addEventListener("change", cb);
      return () => m.removeEventListener("change", cb);
    },
    () => window.matchMedia(query).matches,
    () => false,
  );
}

export const useDesktop = () => useMedia("(min-width: 1024px) and (hover: hover)");
