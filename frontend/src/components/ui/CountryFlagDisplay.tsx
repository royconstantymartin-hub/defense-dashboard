export function CountryFlagDisplay({ countryCode, flagEmoji, flagImageUrl }: { countryCode: string; flagEmoji?: string; flagImageUrl?: string }) {
  if (flagImageUrl) {
    return <img src={flagImageUrl} alt={`${countryCode} flag`} className="h-4 w-6 rounded-sm object-cover" />;
  }
  if (flagEmoji) {
    return <span className="text-base leading-none">{flagEmoji}</span>;
  }
  return <span className="rounded border border-border px-1.5 py-0.5 text-[10px] text-textMuted">{countryCode}</span>;
}
