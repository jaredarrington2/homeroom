export default function ProgressIndicator({ value, max, label }: { value: number; max: number; label?: string }) {
  const pct = max > 0 ? Math.round((value / max) * 100) : 0;
  return (
    <div>
      {label && (
        <div className="flex justify-between text-xs text-ink-muted mb-1">
          <span>{label}</span>
          <span>{pct}%</span>
        </div>
      )}
      <div className="h-1.5 bg-hairline rounded-full overflow-hidden">
        <div
          className="h-full bg-royal transition-all duration-300"
          style={{ width: `${pct}%` }}
          role="progressbar"
          aria-valuenow={value}
          aria-valuemax={max}
        />
      </div>
    </div>
  );
}
