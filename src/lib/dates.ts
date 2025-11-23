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

function toISODate(d: string | Date) {
  if (d instanceof Date) {
    // Convert to YYYY-MM-DD in UTC, then use that date “as civil date”
    return d.toISOString().slice(0, 10);
  }
  return d; // assume already YYYY-MM-DD
}

export function timeRangeWithZone(
  start_date: string | Date,
  start_time: string,
  end_time: string,
  zone: string
) {
  const dateISO = toISODate(start_date);

  const isoStart = `${dateISO}T${start_time}:00`;
  const isoEnd   = `${dateISO}T${end_time}:00`;

  const dStart = new Date(isoStart);
  const dEnd   = new Date(isoEnd);

  if (Number.isNaN(dStart.getTime()) || Number.isNaN(dEnd.getTime())) {
    throw new Error(
      `Invalid date/time: start_date=${String(start_date)} start_time=${start_time} end_time=${end_time}`
    );
  }

  const fmt = new Intl.DateTimeFormat("en-US", {
    timeZone: zone,
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
    timeZoneName: "short",
  });

  const startStr = fmt.format(dStart); // "10:00 AM PST"
  const endStr   = fmt.format(dEnd);   // "11:00 AM PST"

  const tz = startStr.split(" ").pop()!;
  const startTimeOnly = startStr.replace(` ${tz}`, "");
  const endTimeOnly   = endStr.replace(` ${tz}`, "");

  return `${startTimeOnly} – ${endTimeOnly} ${tz}`;
}
