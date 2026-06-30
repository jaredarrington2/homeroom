import type { Metadata } from 'next';
import './globals.css';
import TopBar from '@/components/TopBar';
import ReadingProgress from '@/components/ReadingProgress';
import { AppShell } from '@/components/AppShell';

export const metadata: Metadata = {
  title: 'Homeroom',
  description: 'MLO exam prep',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* Webfonts loaded via <link> (not a CSS @import) — a post-@tailwind @import is
            spec-invalid and silently ignored, which left the whole app on fallback fonts. */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,400;0,9..144,500;0,9..144,600;0,9..144,700;1,9..144,400&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&family=Caveat:wght@400;500;600&family=Courier+Prime:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-paper text-ink font-sans antialiased">
        <AppShell>
          <ReadingProgress />
          <TopBar />
          <main className="max-w-canvas mx-auto px-4 py-8">
            {children}
          </main>
        </AppShell>
      </body>
    </html>
  );
}
