export default function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs font-sans font-semibold uppercase tracking-eyebrow text-ink-muted">
      {children}
    </p>
  );
}
