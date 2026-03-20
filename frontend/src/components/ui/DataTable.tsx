'use client';

import { ArrowUpDown } from 'lucide-react';
import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { StatusBadge } from '@/components/ui/StatusBadge';

type CellValue = unknown;

type Column<T> = {
  key: keyof T;
  label: string;
  sortable?: boolean;
  badge?: boolean;
  render?: (row: T) => React.ReactNode;
};

export function DataTable<T extends { id?: string | number } & Record<string, CellValue>>({
  columns,
  rows,
  rowLinkBase
}: {
  columns: Column<T>[];
  rows: T[];
  rowLinkBase?: string;
}) {
  const router = useRouter();
  const [sortKey, setSortKey] = useState<keyof T | null>(null);
  const [direction, setDirection] = useState<'asc' | 'desc'>('asc');

  const sortedRows = useMemo(() => {
    if (!sortKey) return rows;
    return [...rows].sort((a, b) => {
      const av = a[sortKey];
      const bv = b[sortKey];
      const cmp = String(av ?? '').localeCompare(String(bv ?? ''), undefined, { numeric: true });
      return direction === 'asc' ? cmp : -cmp;
    });
  }, [rows, sortKey, direction]);

  return (
    <div className="overflow-hidden rounded-xl border border-border bg-panel">
      <div className="max-h-[420px] overflow-auto">
        <table className="w-full border-collapse text-sm">
          <thead className="sticky top-0 bg-panelSoft text-xs uppercase tracking-[0.1em] text-textMuted">
            <tr>
              {columns.map((column) => (
                <th key={String(column.key)} className="border-b border-border px-4 py-3 text-left font-medium">
                  <button
                    className="inline-flex items-center gap-1"
                    onClick={() => {
                      if (!column.sortable) return;
                      if (sortKey === column.key) setDirection((prev) => (prev === 'asc' ? 'desc' : 'asc'));
                      else {
                        setSortKey(column.key);
                        setDirection('asc');
                      }
                    }}
                  >
                    {column.label}
                    {column.sortable ? <ArrowUpDown size={12} /> : null}
                  </button>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sortedRows.map((row, index) => (
              <tr
                key={index}
                onClick={() => rowLinkBase && row.id && router.push(`${rowLinkBase}/${row.id}`)}
                className="border-b border-border/70 text-text transition hover:bg-panel"
              >
                {columns.map((column) => (
                  <td key={String(column.key)} className="px-4 py-3 align-middle">
                    {column.render
                      ? column.render(row)
                      : column.badge
                        ? <StatusBadge value={String(row[column.key] ?? '')} />
                        : String(row[column.key] ?? '')}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
