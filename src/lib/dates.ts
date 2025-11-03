const fmtUTC = new Intl.DateTimeFormat(undefined, {
  year: 'numeric',
  month: 'short',
  day: 'numeric',
  timeZone: 'UTC',
});

const fmtLocal = new Intl.DateTimeFormat(undefined, {
  year: 'numeric',
  month: 'short',
  day: 'numeric',
});

export function asDate(d: Date | string): Date {
  return d instanceof Date ? d : new Date(d);
}

export function formatDateUTC(d: Date | string): string {
  return fmtUTC.format(asDate(d));
}

export function formatDateLocal(d: Date | string): string {
  return fmtLocal.format(asDate(d));
}

export function compareDatesDesc(a: Date | string, b: Date | string): number {
  return asDate(b).getTime() - asDate(a).getTime();
}
