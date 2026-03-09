import { Building2 } from 'lucide-react';

export function CompanyLogoAvatar({ name, logoUrl, size = 'md' }: { name: string; logoUrl?: string; size?: 'sm' | 'md' }) {
  const initials = name.split(' ').map((p) => p[0]).join('').slice(0, 2).toUpperCase();
  const cls = size === 'sm' ? 'h-7 w-7 text-xs' : 'h-10 w-10 text-sm';

  if (logoUrl) {
    return <img src={logoUrl} alt={`${name} logo`} className={`${cls} rounded-md object-cover`} />;
  }

  return (
    <div className={`${cls} inline-flex items-center justify-center rounded-md border border-border bg-panelSoft font-semibold text-textMuted`}>
      {initials || <Building2 size={14} />}
    </div>
  );
}
