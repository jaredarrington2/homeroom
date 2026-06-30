'use client';
import { useEffect, useRef, useState } from 'react';

interface TOCItem {
  id: string;
  term: string;
}

export default function ScrollspyTOC({ items }: { items: TOCItem[] }) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id.replace('concept-', ''));
          }
        }
      },
      { rootMargin: '-20% 0px -70% 0px' }
    );

    items.forEach(({ id }) => {
      const el = document.getElementById(`concept-${id}`);
      if (el) observerRef.current?.observe(el);
    });

    return () => observerRef.current?.disconnect();
  }, [items]);

  return (
    <nav>
      <p className="font-sans text-xs font-semibold uppercase tracking-widest text-ink-faint mb-3">
        On this page
      </p>
      <ul className="space-y-2">
        {items.map(({ id, term }) => (
          <li key={id}>
            <a
              href={`#concept-${id}`}
              className={`text-sm leading-snug transition-colors block ${
                activeId === id
                  ? 'text-royal font-medium'
                  : 'text-ink-muted hover:text-ink'
              }`}
            >
              {term}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
