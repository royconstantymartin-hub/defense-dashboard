import { PageHeader } from '@/components/layout/PageHeader';
import { countries, expenditureRows, followEntities, announcementRows, regulationRows } from '@/lib/demo-data';
import { CountryFlagDisplay } from '@/components/ui/CountryFlagDisplay';
import { OfficialLinksPanel } from '@/components/ui/OfficialLinksPanel';
import { SectionCard } from '@/components/ui/SectionCard';
import { FollowEntityCard } from '@/components/ui/FollowEntityCard';
import { EmptyState } from '@/components/ui/EmptyState';

export default function CountryDetailPage({ params }: { params: { code: string } }) {
  const code = params.code.toUpperCase();
  const country = countries.find((c) => c.country_code === code);
  if (!country) return <main className="container"><EmptyState title="Country not found" description="No country data available for this code." /></main>;

  const relatedFollow = followEntities.filter((f) => f.country_code === code);
  const relatedAnnouncements = announcementRows.filter((a) => a.country_code === code);
  const relatedRegulations = regulationRows.filter((r) => r.country_code === code);
  const exp = expenditureRows.find((e) => e.country_code === code);

  return (
    <main className="container space-y-4">
      <PageHeader title={country.name} subtitle={`${country.region}${country.subregion ? ` · ${country.subregion}` : ''}`} />
      <section className="rounded-xl border border-border bg-panel p-4">
        <div className="flex items-center gap-3"><CountryFlagDisplay countryCode={country.country_code} flagEmoji={country.flag_emoji} flagImageUrl={country.flag_image_url} /><p className="text-sm text-textMuted">{country.country_code}</p></div>
      </section>

      <OfficialLinksPanel links={[{ label: 'Ministry of Defense', url: country.ministry_of_defense_url }, { label: 'Procurement Authority', url: country.procurement_authority_url }]} />

      <SectionCard title="Related Follow Accounts"><div className="space-y-2">{relatedFollow.length ? relatedFollow.map((e) => <FollowEntityCard key={e.id} entity={e} />) : <EmptyState title="No follow entities" description="No linked monitoring entities." />}</div></SectionCard>
      <SectionCard title="Related Recent Announcements"><div className="text-sm text-textMuted space-y-2">{relatedAnnouncements.length ? relatedAnnouncements.map((a)=><p key={a.id}>• {a.headline}</p>) : 'No linked announcements.'}</div></SectionCard>
      <SectionCard title="Related Regulations"><div className="text-sm text-textMuted space-y-2">{relatedRegulations.length ? relatedRegulations.map((r)=><p key={r.id}>• {r.policy}</p>) : 'No linked regulations.'}</div></SectionCard>
      <SectionCard title="Expenditures Summary"><p className="text-sm text-textMuted">{exp ? `${exp.year}: ${exp.spend} (${exp.gdp} GDP)` : 'No expenditure snapshot available.'}</p></SectionCard>
    </main>
  );
}
