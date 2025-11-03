type D = Date | string;

const fmtUTC = new Intl.DateTimeFormat(undefined, {
  year: 'numeric',
  month: 'short',
  day: 'numeric',
  timeZone: 'UTC',
});

export function asDate(d: D): Date {
  return d instanceof Date ? d : new Date(d);
}

export function formatDateUTC(d: D): string {
  return fmtUTC.format(asDate(d));
}

export function compareDatesDesc(a: D, b: D): number {
  return asDate(b).getTime() - asDate(a).getTime();
}

// Sort by date (newest first), then by order (lower first).
export function compareByDateThenOrder(
  a: { date: D; order?: number },
  b: { date: D; order?: number }
): number {
  const diff = compareDatesDesc(a.date, b.date);
  if (diff !== 0) return diff;
  const ao = (a.order ?? 0) | 0;
  const bo = (b.order ?? 0) | 0;
  return ao - bo; // lower order wins
}
