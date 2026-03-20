import type { FollowEntity } from '@/lib/types';
import { CompanyLogoAvatar } from '@/components/ui/CompanyLogoAvatar';
import { CountryFlagDisplay } from '@/components/ui/CountryFlagDisplay';
import { EntityTypeBadge } from '@/components/ui/EntityTypeBadge';
import { PlatformBadge } from '@/components/ui/PlatformBadge';

function SourceClass(entity: FollowEntity) {
  if (entity.is_official) return 'text-positive';
  if (entity.entity_type === 'media') return 'text-purple';
  if (entity.entity_type === 'analyst') return 'text-amber';
  return 'text-textMuted';
}

export function FollowEntityCard({ entity }: { entity: FollowEntity }) {
  return (
    <article className="rounded-lg border border-border bg-panel p-2.5">
      <div className="flex items-start gap-2.5">
        <CompanyLogoAvatar name={entity.entity_name} logoUrl={entity.logo_url || entity.avatar_url} size="sm" />
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-1.5">
            <p className="text-sm font-semibold text-text">{entity.entity_name}</p>
            <EntityTypeBadge entityType={entity.entity_type} />
            <PlatformBadge platform={entity.platform} />
            <span className={`text-[10px] uppercase tracking-wide ${SourceClass(entity)}`}>
              {entity.is_official ? 'official account' : entity.entity_type === 'media' ? 'media source' : 'commentary / analysis'}
            </span>
            {entity.country_code ? <CountryFlagDisplay countryCode={entity.country_code} /> : null}
          </div>
          <p className="mt-1 line-clamp-2 text-xs text-textMuted">{entity.description}</p>
          <a className="mt-1.5 inline-block text-xs text-accent hover:underline" href={entity.profile_url} target="_blank" rel="noreferrer">
            Open profile
          </a>
        </div>
      </div>
    </article>
  );
}
