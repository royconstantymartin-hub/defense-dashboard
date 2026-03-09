import Link from 'next/link';
import { EmptyState } from '@/components/ui/EmptyState';
import { PageHeader } from '@/components/layout/PageHeader';
import { CompanyLogoAvatar } from '@/components/ui/CompanyLogoAvatar';
import { OfficialLinksPanel } from '@/components/ui/OfficialLinksPanel';
import { SocialLinksPanel } from '@/components/ui/SocialLinksPanel';
import { SectionCard } from '@/components/ui/SectionCard';
import { FollowEntityCard } from '@/components/ui/FollowEntityCard';
import { companies, followEntities, maRows, productRows, announcementRows } from '@/lib/demo-data';

export default function CompanyDetailPage({ params }: { params: { id: string } }) {
  const company = companies.find((c) => c.id === params.id);
  const relatedFollow = followEntities.filter((f) => f.related_company_id === params.id);
  const relatedAnnouncements = announcementRows.filter((a) => a.company_id === params.id);

  if (!company) {
    return <main className="container"><EmptyState title="Company not found" description="The requested company record is unavailable." /></main>;
  }

  return (
    <main className="container space-y-4">
      <PageHeader title={company.name} subtitle={company.short_description} />
      <section className="rounded-xl border border-border bg-panel p-4">
        <div className="flex items-center gap-3">
          <CompanyLogoAvatar name={company.name} logoUrl={company.logo_url} />
          <div>
            <p className="text-sm text-textMuted">{company.country_name} · {company.segment}</p>
            <p className="text-xs text-textMuted">Country code: {company.country_code}</p>
          </div>
        </div>
      </section>

      <div className="grid gap-4 xl:grid-cols-2">
        <OfficialLinksPanel links={[{ label: 'Website', url: company.website_url }, { label: 'Investor Relations', url: company.investor_relations_url }]} />
        <SocialLinksPanel links={[{ label: 'LinkedIn', url: company.linkedin_url }, { label: 'X', url: company.x_url }]} />
      </div>

      <SectionCard title="Related Follow Accounts" subtitle="Curated monitoring entities connected to this company.">
        <div className="space-y-2">
          {relatedFollow.length ? relatedFollow.map((entity) => <FollowEntityCard key={entity.id} entity={entity} />) : <EmptyState title="No follow accounts" description="No tracked follow entities are linked yet." />}
        </div>
      </SectionCard>

      <SectionCard title="Related Recent Announcements" subtitle="Latest linked records.">
        <div className="space-y-2 text-sm text-textMuted">{relatedAnnouncements.length ? relatedAnnouncements.map((a) => <p key={a.id}>• {a.headline}</p>) : 'No announcements linked.'}</div>
      </SectionCard>

      <SectionCard title="Related Deals" subtitle="M&A references involving this company.">
        <div className="space-y-2 text-sm text-textMuted">{maRows.map((m) => <p key={m.id}>• {m.acquirer} → {m.target} ({m.value})</p>)}</div>
      </SectionCard>

      <SectionCard title="Related Products" subtitle="Products associated with this company.">
        <div className="space-y-2 text-sm text-textMuted">{productRows.map((p) => <p key={p.id}>• {p.name} ({p.category})</p>)}</div>
      </SectionCard>

      <div><Link href="/companies" className="text-sm text-accent hover:underline">← Back to companies</Link></div>
    </main>
  );
}
