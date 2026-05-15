import { useState } from "react";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import {
  Shield, Cpu, Truck, Globe, Target,
  CheckCircle2, Clock, FileText, XCircle,
  ExternalLink, Building2, Calendar, Users,
  DollarSign, Zap, Package, AlertCircle,
} from "lucide-react";
import ProductIllustration from "@/components/ProductIllustration";

// ── Helpers ───────────────────────────────────────────────────────────────────

const STATUS_LABELS = {
  in_production:    { label: "In Production",   cls: "bg-emerald-50 text-emerald-700 border-emerald-200" },
  in_service_only:  { label: "In Service",       cls: "bg-blue-50 text-blue-700 border-blue-200" },
  upgrade_program:  { label: "Upgrade Program",  cls: "bg-amber-50 text-amber-700 border-amber-200" },
  development:      { label: "Development",      cls: "bg-purple-50 text-purple-700 border-purple-200" },
  cancelled:        { label: "Cancelled",        cls: "bg-slate-100 text-slate-500 border-slate-200" },
};

const CONTRACT_STATUS = {
  delivered:   { label: "Delivered",    icon: CheckCircle2, cls: "text-emerald-600" },
  in_delivery: { label: "In Delivery",  icon: Clock,        cls: "text-amber-600"   },
  signed:      { label: "Signed",       icon: FileText,     cls: "text-blue-600"    },
  cancelled:   { label: "Cancelled",    icon: XCircle,      cls: "text-rose-500"    },
};

const CONFIDENCE_COLORS = {
  high:   "bg-emerald-400",
  medium: "bg-amber-400",
  low:    "bg-rose-400",
};
const CONFIDENCE_LABELS = {
  high:   "Reliable — official or primary source",
  medium: "Estimated — specialist press or secondary source",
  low:    "Uncertain — unconfirmed or conflicting sources",
};

function Flag({ code, size = 20 }) {
  if (!code) return null;
  return (
    <img
      src={`https://flagcdn.com/w40/${code}.png`}
      alt={code}
      width={size}
      height={Math.round(size * 0.67)}
      className="rounded-sm object-cover shrink-0"
      onError={e => { e.target.style.display = "none"; }}
    />
  );
}

function ConfidenceDot({ level, note, sources = [] }) {
  const tipLines = [
    CONFIDENCE_LABELS[level],
    note,
    sources.length ? `${sources.length} source(s)` : null,
  ].filter(Boolean);

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <span className={`inline-block w-2 h-2 rounded-full shrink-0 cursor-help ${CONFIDENCE_COLORS[level]}`} />
      </TooltipTrigger>
      <TooltipContent className="max-w-xs text-xs space-y-1">
        {tipLines.map((l, i) => <p key={i}>{l}</p>)}
      </TooltipContent>
    </Tooltip>
  );
}

function SourcedStat({ label, data, prefix = "", suffix = "", formatFn }) {
  if (!data) return null;
  const raw = data.value;
  const display =
    raw === "N/A"        ? "N/A" :
    raw === "Classified" ? "🔒 Classified" :
    formatFn             ? formatFn(raw) :
    `${prefix}${raw}${suffix}`;

  return (
    <div className="flex flex-col gap-1">
      <p className="text-xs font-medium uppercase tracking-wider text-slate-400">{label}</p>
      <div className="flex items-center gap-1.5">
        <span className="font-mono font-bold text-slate-900 text-lg leading-none">{display}</span>
        <ConfidenceDot level={data.confidence} note={data.note} sources={data.sources} />
      </div>
    </div>
  );
}

// ── Section components ─────────────────────────────────────────────────────────

function OverviewTab({ detail }) {
  return (
    <div className="space-y-6 p-5">
      {detail.data_disclaimer && (
        <div className="flex items-start gap-2 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2 text-xs text-amber-700">
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
          <span>{detail.data_disclaimer}</span>
        </div>
      )}

      <div>
        <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">Variants</p>
        <Accordion type="multiple" className="space-y-2">
          {detail.variants.map((v, i) => (
            <AccordionItem
              key={i}
              value={`variant-${i}`}
              className="border border-slate-200 rounded-xl overflow-hidden"
            >
              <AccordionTrigger className="px-4 py-3 hover:bg-slate-50 hover:no-underline [&>svg]:shrink-0">
                <div className="flex items-center gap-3 text-left">
                  <span className="font-medium text-slate-900 text-sm">{v.name}</span>
                  <span className="text-xs text-slate-500 hidden sm:block">{v.role}</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-4 pb-4 pt-2 space-y-3">
                <p className="text-xs text-slate-500 italic sm:hidden">{v.role}</p>
                <ul className="space-y-1">
                  {v.key_differences.map((d, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm text-slate-700">
                      <span className="text-purple-500 mt-0.5 shrink-0">•</span>
                      {d}
                    </li>
                  ))}
                </ul>
                <div className="flex flex-wrap items-center gap-3 pt-1">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs text-slate-400">Units produced:</span>
                    <span className="text-xs font-mono font-semibold text-slate-700">
                      {v.units_produced.value === "N/A" ? "N/A" : v.units_produced.value}
                    </span>
                    <ConfidenceDot level={v.units_produced.confidence} note={v.units_produced.note} sources={v.units_produced.sources} />
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {v.operators.map((op, k) => (
                      <span key={k} className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full">{op}</span>
                    ))}
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
}

function SpecsTab({ detail }) {
  return (
    <div className="space-y-6 p-5">
      <div>
        <div className="flex items-center gap-2 mb-3">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Technical Specifications</p>
          <ConfidenceDot level={detail.tech_specs_confidence} note={null} sources={[]} />
        </div>
        <div className="grid grid-cols-2 gap-2">
          {Object.entries(detail.tech_specs).map(([key, value]) => (
            <div key={key} className="bg-slate-50 border border-slate-100 rounded-lg px-3 py-2.5">
              <p className="text-xs font-medium uppercase tracking-wider text-slate-400 mb-0.5">
                {key.replace(/_/g, " ")}
              </p>
              <p className="font-mono text-sm text-slate-900">{value}</p>
            </div>
          ))}
        </div>
      </div>

      {detail.compatible_weapons && (
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">Compatible Weapons</p>
          <div className="flex flex-wrap gap-1.5">
            {detail.compatible_weapons.map((w, i) => (
              <span key={i} className="text-xs bg-rose-50 text-rose-700 border border-rose-100 px-2.5 py-1 rounded-full">
                {w}
              </span>
            ))}
          </div>
          <div className="grid grid-cols-2 gap-2 mt-3">
            {detail.max_payload_kg && (
              <div className="bg-slate-50 border border-slate-100 rounded-lg px-3 py-2.5">
                <p className="text-xs font-medium uppercase tracking-wider text-slate-400 mb-0.5">Max Payload</p>
                <p className="font-mono text-sm text-slate-900">{detail.max_payload_kg}</p>
              </div>
            )}
            {detail.hardpoints_count && (
              <div className="bg-slate-50 border border-slate-100 rounded-lg px-3 py-2.5">
                <p className="text-xs font-medium uppercase tracking-wider text-slate-400 mb-0.5">Hardpoints</p>
                <p className="font-mono text-sm text-slate-900">{detail.hardpoints_count}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function ProductionTab({ detail }) {
  const totalOrdered   = detail.total_ordered.value;
  const totalDelivered = detail.total_delivered.value;
  const pct = (typeof totalOrdered === "number" && typeof totalDelivered === "number" && totalOrdered > 0)
    ? Math.round((totalDelivered / totalOrdered) * 100)
    : null;

  return (
    <div className="space-y-6 p-5">
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 text-center">
          <p className="text-xs font-medium uppercase tracking-wider text-slate-400 mb-1">Ordered</p>
          <div className="flex items-center justify-center gap-1.5">
            <span className="font-mono text-2xl font-bold text-slate-900">{totalOrdered}</span>
            <ConfidenceDot level={detail.total_ordered.confidence} note={detail.total_ordered.note} sources={detail.total_ordered.sources} />
          </div>
        </div>
        <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 text-center">
          <p className="text-xs font-medium uppercase tracking-wider text-slate-400 mb-1">Delivered</p>
          <div className="flex items-center justify-center gap-1.5">
            <span className="font-mono text-2xl font-bold text-emerald-700">{totalDelivered}</span>
            <ConfidenceDot level={detail.total_delivered.confidence} note={detail.total_delivered.note} sources={detail.total_delivered.sources} />
          </div>
        </div>
        <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 text-center">
          <p className="text-xs font-medium uppercase tracking-wider text-slate-400 mb-1">Backlog</p>
          <span className="font-mono text-2xl font-bold text-purple-700">
            {detail.backlog ?? "N/A"}
          </span>
        </div>
      </div>

      {pct !== null && (
        <div>
          <div className="flex justify-between text-xs text-slate-500 mb-1.5">
            <span>Delivery progress</span>
            <span>{pct}%</span>
          </div>
          <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
            <div className="h-full bg-emerald-500 rounded-full transition-all" style={{ width: `${pct}%` }} />
          </div>
        </div>
      )}

      <div className="flex flex-wrap gap-3 text-xs text-slate-600">
        <div className="flex items-center gap-1.5">
          <Calendar className="w-3.5 h-3.5 text-slate-400" />
          <span>Production started <strong>{detail.production_start_year}</strong></span>
        </div>
        {detail.production_end_year === null && (
          <div className="flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5 text-emerald-500" />
            <span>Currently in production</span>
          </div>
        )}
      </div>

      <div>
        <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">Deliveries by country</p>
        <div className="border border-slate-200 rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className="text-left p-3 text-xs font-semibold uppercase tracking-wider text-slate-400">Country</th>
                <th className="text-right p-3 text-xs font-semibold uppercase tracking-wider text-slate-400">Ordered</th>
                <th className="text-right p-3 text-xs font-semibold uppercase tracking-wider text-slate-400">Delivered</th>
                <th className="text-right p-3 text-xs font-semibold uppercase tracking-wider text-slate-400 hidden sm:table-cell">Timeline</th>
              </tr>
            </thead>
            <tbody>
              {detail.deliveries_by_country.map((d, i) => {
                const rowPct = d.ordered > 0 ? Math.round((d.delivered / d.ordered) * 100) : 0;
                return (
                  <tr key={i} className="border-b border-slate-50 last:border-0 hover:bg-slate-50/50">
                    <td className="p-3">
                      <div className="flex items-center gap-2">
                        <Flag code={d.country_code} size={18} />
                        <span className="text-slate-700 font-medium">{d.country}</span>
                      </div>
                    </td>
                    <td className="p-3 text-right font-mono text-slate-700">{d.ordered}</td>
                    <td className="p-3 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <span className="font-mono text-slate-700">{d.delivered}</span>
                        <div className="hidden sm:block w-16 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                          <div className="h-full bg-emerald-400 rounded-full" style={{ width: `${rowPct}%` }} />
                        </div>
                      </div>
                    </td>
                    <td className="p-3 text-right text-xs text-slate-400 hidden sm:table-cell">{d.delivery_date}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function ExportsTab({ contracts }) {
  return (
    <div className="p-5 space-y-3">
      <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">
        Export Contracts ({contracts.length})
      </p>
      <div className="space-y-2">
        {contracts.map((c, i) => {
          const st = CONTRACT_STATUS[c.status] ?? CONTRACT_STATUS.signed;
          const Icon = st.icon;
          return (
            <div key={i} className="border border-slate-200 rounded-xl p-4 hover:border-purple-200 hover:bg-slate-50/50 transition-colors">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1.5">
                    <Flag code={c.customer_country_code} size={20} />
                    <span className="font-medium text-slate-900 text-sm">{c.customer_country}</span>
                  </div>
                  <span className="text-xs text-slate-400">{c.year}</span>
                </div>
                <div className={`flex items-center gap-1 text-xs font-medium shrink-0 ${st.cls}`}>
                  <Icon className="w-3.5 h-3.5" />
                  {st.label}
                </div>
              </div>
              <div className="flex flex-wrap gap-4 mt-3 text-xs text-slate-600">
                <div className="flex items-center gap-1">
                  <Package className="w-3.5 h-3.5 text-slate-400" />
                  <span><strong>{c.units}</strong> aircraft</span>
                </div>
                <div className="flex items-center gap-1">
                  <DollarSign className="w-3.5 h-3.5 text-slate-400" />
                  {c.contract_value_usd
                    ? <span><strong>${c.contract_value_usd}B</strong></span>
                    : <em className="text-slate-400">Value undisclosed</em>}
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" />
                  <span>{c.delivery_window}</span>
                </div>
              </div>
              {c.note && (
                <p className="mt-2 text-xs text-slate-500 leading-relaxed border-t border-slate-100 pt-2">{c.note}</p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function RivalsTab({ competitors, onSelectProduct }) {
  return (
    <div className="p-5 space-y-3">
      <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">Direct Competitors</p>
      <div className="space-y-3">
        {competitors.map((c, i) => (
          <div key={i} className="border border-slate-200 rounded-xl p-4 space-y-2 hover:border-purple-200 transition-colors">
            <div className="flex items-start justify-between gap-2">
              <div>
                <p className="font-medium text-slate-900 text-sm">{c.name}</p>
                <p className="text-xs text-slate-500">{c.manufacturer}</p>
              </div>
              {c.dashboard_product_id && (
                <button
                  onClick={() => onSelectProduct && onSelectProduct(c.dashboard_product_id)}
                  className="flex items-center gap-1 text-xs text-purple-600 hover:text-purple-800 shrink-0 transition-colors"
                >
                  View profile
                  <ExternalLink className="w-3 h-3" />
                </button>
              )}
            </div>
            <p className="text-sm text-slate-600 leading-relaxed">{c.summary}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Main component ─────────────────────────────────────────────────────────────

export default function FlagshipProductDetail({ product, detail, open, onClose, imgSrc, onNavigateToProduct }) {
  const [activeTab, setActiveTab] = useState("overview");

  if (!product || !detail) return null;

  const statusInfo = STATUS_LABELS[detail.production_status] ?? STATUS_LABELS.in_service_only;

  return (
    <TooltipProvider delayDuration={200}>
      <Sheet open={open} onOpenChange={v => { if (!v) onClose(); }}>
        <SheetContent
          side="right"
          className="w-[min(95vw,860px)] p-0 flex flex-col gap-0 overflow-hidden"
        >
          {/* ── Hero image ───────────────────────────────────────────── */}
          <div className="h-44 bg-gradient-to-br from-slate-100 to-slate-50 shrink-0 relative">
            {imgSrc ? (
              <img
                src={imgSrc}
                alt={product.name}
                className="w-full h-full object-cover"
                onError={e => { e.target.style.display = "none"; }}
              />
            ) : (
              <ProductIllustration
                category={product.category}
                productType={product.product_type}
                name={product.name}
                className="absolute inset-0"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

            {/* Status badge — bottom left to avoid overlap with SheetContent's close button */}
            <span className={`absolute bottom-3 left-3 text-xs font-medium px-2.5 py-1 rounded-full border ${statusInfo.cls}`}>
              {statusInfo.label}
            </span>
            <span className="absolute bottom-3 right-3 text-xs font-medium px-2 py-1 rounded-full bg-purple-700 text-white">
              ★ Full Profile
            </span>
          </div>

          {/* ── Identity strip ────────────────────────────────────────── */}
          <div className="px-5 pt-4 pb-3 border-b border-slate-100 shrink-0">
            <h2 className="font-heading text-xl font-bold text-slate-900 leading-tight pr-6">
              {detail.official_designation}
            </h2>
            <p className="text-sm text-slate-500 mt-0.5">{detail.category_label}</p>

            <div className="flex flex-wrap items-center gap-3 mt-3">
              <div className="flex items-center gap-1.5">
                {detail.country_codes.map((code, i) => (
                  <Flag key={i} code={code} size={18} />
                ))}
                <span className="text-xs text-slate-600">{detail.countries_of_origin.join(", ")}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5 text-slate-400" />
                <span className="text-xs text-slate-600">{detail.manufacturers.join(", ")}</span>
              </div>
              {detail.year_ioc !== "N/A" && (
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" />
                  <span className="text-xs text-slate-600">IOC {detail.year_ioc}</span>
                </div>
              )}
            </div>

            {detail.partner_companies?.length > 0 && (
              <p className="text-xs text-slate-400 mt-2">
                Partners: {detail.partner_companies.join(", ")}
              </p>
            )}
          </div>

          {/* ── Key figures strip ─────────────────────────────────────── */}
          <div className="grid grid-cols-4 divide-x divide-slate-100 border-b border-slate-100 shrink-0">
            <div className="p-3">
              <SourcedStat label="Units built" data={detail.total_units_produced} />
            </div>
            <div className="p-3">
              <SourcedStat label="Unit cost" data={detail.unit_cost_usd} suffix="M$" formatFn={v => `${v}`} />
              {detail.unit_cost_year && (
                <p className="text-xs text-slate-400 mt-0.5">({detail.unit_cost_year})</p>
              )}
            </div>
            <div className="p-3">
              <p className="text-xs font-medium uppercase tracking-wider text-slate-400 mb-1">Operators</p>
              <div className="flex items-center gap-1.5">
                <Users className="w-4 h-4 text-slate-400" />
                <span className="font-mono font-bold text-slate-900 text-lg leading-none">
                  {detail.operator_countries_count}
                </span>
              </div>
            </div>
            <div className="p-3">
              {detail.production_rate_per_year ? (
                <SourcedStat label="Rate/yr" data={detail.production_rate_per_year} suffix=" ac." />
              ) : (
                <div>
                  <p className="text-xs font-medium uppercase tracking-wider text-slate-400 mb-1">Rate/yr</p>
                  <span className="font-mono font-bold text-slate-500 text-lg">N/A</span>
                </div>
              )}
            </div>
          </div>

          {/* ── Tabs ─────────────────────────────────────────────────── */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="flex flex-col flex-1 min-h-0">
            {/* Scrollable tab bar so all tabs are always reachable on narrow panels */}
            <div className="shrink-0 bg-slate-50 border-b border-slate-100 overflow-x-auto">
              <TabsList className="bg-transparent rounded-none justify-start px-3 gap-0 h-10 w-max min-w-full">
                {[
                  { value: "overview",   label: "Variants",    Icon: Shield  },
                  { value: "specs",      label: "Specs",       Icon: Cpu     },
                  { value: "production", label: "Production",  Icon: Truck   },
                  { value: "exports",    label: "Exports",     Icon: Globe   },
                  { value: "rivals",     label: "Rivals",      Icon: Target  },
                ].map(({ value, label, Icon }) => (
                  <TabsTrigger
                    key={value}
                    value={value}
                    className="flex items-center gap-1.5 text-xs rounded-none border-b-2 border-transparent data-[state=active]:border-purple-600 data-[state=active]:text-purple-700 data-[state=active]:bg-transparent px-4 h-full text-slate-500 hover:text-slate-700 transition-colors whitespace-nowrap"
                  >
                    <Icon className="w-3.5 h-3.5" />
                    {label}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>

            <div className="flex-1 overflow-y-auto">
              <TabsContent value="overview"   className="mt-0 focus-visible:ring-0"><OverviewTab detail={detail} /></TabsContent>
              <TabsContent value="specs"      className="mt-0 focus-visible:ring-0"><SpecsTab detail={detail} /></TabsContent>
              <TabsContent value="production" className="mt-0 focus-visible:ring-0"><ProductionTab detail={detail} /></TabsContent>
              <TabsContent value="exports"    className="mt-0 focus-visible:ring-0"><ExportsTab contracts={detail.export_contracts} /></TabsContent>
              <TabsContent value="rivals"     className="mt-0 focus-visible:ring-0"><RivalsTab competitors={detail.competitors} onSelectProduct={onNavigateToProduct} /></TabsContent>
            </div>
          </Tabs>

          {/* ── Footer ────────────────────────────────────────────────── */}
          <div className="px-5 py-2.5 border-t border-slate-100 shrink-0 flex items-center justify-between">
            <p className="text-xs text-slate-400">Updated: {detail.last_updated}</p>
            <div className="flex items-center gap-3 text-xs text-slate-400">
              <span className="flex items-center gap-1"><span className="inline-block w-2 h-2 rounded-full bg-emerald-400" /> Reliable</span>
              <span className="flex items-center gap-1"><span className="inline-block w-2 h-2 rounded-full bg-amber-400" /> Estimated</span>
              <span className="flex items-center gap-1"><span className="inline-block w-2 h-2 rounded-full bg-rose-400" /> Uncertain</span>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </TooltipProvider>
  );
}
