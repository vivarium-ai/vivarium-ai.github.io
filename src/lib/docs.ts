import type { CollectionEntry } from "astro:content";

export type DocEntry = CollectionEntry<"docs">;

export function titleFor(e: DocEntry): string {
  return e.data.title ?? e.slug.split("/").pop() ?? e.slug;
}

export function filterDocsByPrefix(entries: DocEntry[], prefix: string): DocEntry[] {
  return entries.filter((e) => e.id.startsWith(prefix));
}

/**
 * Sort: date desc, then order asc, then title asc.
 * Matches the “stable formatter” vibe you’ve used elsewhere.
 */
export function sortDocs(entries: DocEntry[]): DocEntry[] {
  return entries.slice().sort((a, b) => {
    const da = a.data.date ? new Date(a.data.date).getTime() : 0;
    const db = b.data.date ? new Date(b.data.date).getTime() : 0;
    if (db !== da) return db - da;

    const oa = Number.isFinite(a.data.order) ? (a.data.order as number) : Number.POSITIVE_INFINITY;
    const ob = Number.isFinite(b.data.order) ? (b.data.order as number) : Number.POSITIVE_INFINITY;
    if (oa !== ob) return oa - ob;

    return titleFor(a).localeCompare(titleFor(b));
  });
}

export type DocListItem = {
  id: string;
  href: string;
  title: string;
  section?: string;
};

export function toListItems(entries: DocEntry[]): DocListItem[] {
  return entries.map((e) => ({
    id: e.id, // e.g. "tutorials/my-doc"
    href: `/docs/${e.slug}`, // e.g. "/docs/tutorials/my-doc"
    title: titleFor(e),
    section: e.id.split("/")[0],
  }));
}

/** Types matching Astro’s render() headings shape */
export type RawHeading = {
  depth: number; // 1..6
  slug: string;  // id attribute for the heading
  text: string;  // plaintext content
};

export type TocItem = { slug: string; text: string; children?: TocItem[] };

/**
 * Builds a nested ToC from render() headings.
 * Defaults to H2/H3 grouping like Starlight.
 */
export function buildToc(raw: RawHeading[], levels: number[] = [2, 3]): TocItem[] {
  const allowed = new Set(levels);
  const items: TocItem[] = [];
  let currentH2: TocItem | null = null;

  for (const h of raw) {
    if (!allowed.has(h.depth)) continue;
    if (h.depth === 2) {
      currentH2 = { slug: `#${h.slug}`, text: h.text, children: [] };
      items.push(currentH2);
    } else if (h.depth === 3) {
      const child = { slug: `#${h.slug}`, text: h.text };
      if (currentH2) {
        currentH2.children!.push(child);
      } else {
        // If a doc starts at h3, treat as top-level fallback.
        items.push({ ...child });
      }
    }
  }
  return items;
}
