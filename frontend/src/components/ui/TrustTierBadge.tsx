import type { TrustTier } from '@/lib/types';

const styles: Record<TrustTier, string> = {
  official: 'bg-positive/15 text-positive border-positive/30',
  tier_1: 'bg-accent/15 text-accent border-accent/30',
  specialist: 'bg-purple/15 text-purple border-purple/30',
  secondary: 'bg-amber/15 text-amber border-amber/30',
};

export function TrustTierBadge({ tier }: { tier: TrustTier }) {
  return <span className={`rounded border px-1.5 py-0.5 text-[9px] uppercase tracking-wide ${styles[tier]}`}>{tier.replace('_', ' ')}</span>;
}
