export function PlatformBadge({ platform }: { platform: string }) {
  return <span className="rounded border border-border bg-panelSoft px-1.5 py-0.5 text-[10px] uppercase tracking-wide text-textMuted">{platform}</span>;
}
