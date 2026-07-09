'use client';
// components/ReaderDeepLink.tsx — lands a search deep-link on its exact target. On mount and on
// hashchange, if the URL hash resolves to a group anchor (#grp-{unitId}-{gi}) or a unit anchor
// (#{unitId}) inside the reader, scroll it to center and pulse a 1.2s .sr-flash highlight (§9).
import { useEffect } from 'react';

export default function ReaderDeepLink() {
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | null = null;

    const land = () => {
      const hash = window.location.hash;
      if (!hash || hash.length < 2) return;
      const el = document.getElementById(decodeURIComponent(hash.slice(1)));
      if (!el || !el.closest('.section-reader')) return;
      el.scrollIntoView({ block: 'center', behavior: 'smooth' });
      el.classList.remove('sr-flash');
      // reflow so re-adding the class restarts the animation on a repeat click
      void el.offsetWidth;
      el.classList.add('sr-flash');
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => el.classList.remove('sr-flash'), 1300);
    };

    // let SSR content settle before the first landing
    const raf = requestAnimationFrame(land);
    window.addEventListener('hashchange', land);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('hashchange', land);
      if (timer) clearTimeout(timer);
    };
  }, []);

  return null;
}
