'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import ContentsDrawer from './ContentsDrawer';
import SearchPanel from './SearchPanel';
import Calculator from './Calculator';
import AccountMenu from './AccountMenu';

const NAV = [
  { href: '/learn', label: 'Learn' },
  { href: '/practice', label: 'Practice' },
  // Study consolidates vocab (glossary) and cards (flashcards).
  { href: '/study', label: 'Study', alsoActiveOn: ['/flashcards', '/glossary'] },
];

function isActive(path: string, href: string, alsoActiveOn?: string[]): boolean {
  if (path === href || path.startsWith(href + '/')) return true;
  return (alsoActiveOn ?? []).some((p) => path === p || path.startsWith(p + '/'));
}

export default function TopBar() {
  const path = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="border-b border-hairline bg-paper sticky top-0 z-50">
      <div className="max-w-canvas mx-auto px-4 flex items-center gap-8 h-14">
        {/* Course contents — icon trigger at far left, opens the left drawer (only on /learn routes) */}
        <ContentsDrawer />

        <Link href="/" className="font-display font-semibold text-lg tracking-display text-ink">
          Homeroom
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6">
          {NAV.map(({ href, label, alsoActiveOn }) => {
            const active = isActive(path, href, alsoActiveOn);
            return (
              <Link
                key={href}
                href={href}
                className={`text-sm font-medium transition-colors ${
                  active ? 'text-royal' : 'text-ink-muted hover:text-ink'
                }`}
              >
                {label}
              </Link>
            );
          })}
        </nav>

        <div className="ml-auto flex items-center gap-4">
          {/* Search notes — magnifier trigger + overlay, gated to /learn (self-contained) */}
          <SearchPanel />

          {/* Calculator dock — trigger + dock, gated to /learn + /practice (self-contained) */}
          <Calculator />

          <AccountMenu />

          {/* Hamburger button — mobile only */}
          <button
            className="md:hidden p-1 text-ink-muted hover:text-ink transition-colors"
            aria-label="Toggle menu"
            onClick={() => setMenuOpen(o => !o)}
          >
            {menuOpen ? (
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M4 4l12 12M16 4L4 16" />
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M3 5h14M3 10h14M3 15h14" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div className="md:hidden border-t border-hairline bg-paper px-4 pb-4 pt-3 space-y-1">
          {NAV.map(({ href, label, alsoActiveOn }) => {
            const active = isActive(path, href, alsoActiveOn);
            return (
              <Link
                key={href}
                href={href}
                onClick={() => setMenuOpen(false)}
                className={`block py-2 text-sm font-medium transition-colors ${
                  active ? 'text-royal' : 'text-ink-muted hover:text-ink'
                }`}
              >
                {label}
              </Link>
            );
          })}
          <Link
            href="/settings"
            onClick={() => setMenuOpen(false)}
            className="block py-2 text-sm text-ink-muted hover:text-ink transition-colors"
          >
            Settings
          </Link>
        </div>
      )}
    </header>
  );
}
