import { getCollection, type CollectionEntry } from "astro:content";

type BlogEntry = CollectionEntry<"blog">;

const toEpoch = (d: unknown): number => {
  if (!d) return 0;
  const t = new Date(d as any).getTime();
  return Number.isFinite(t) ? t : 0;
};

const cmpBlog = (a: BlogEntry, b: BlogEntry): number => {
  // 1) date desc
  const da = toEpoch(a.data.date);
  const db = toEpoch(b.data.date);
  if (db !== da) return db - da;

  // 2) order asc (missing = Infinity so it sorts after real numbers)
  const oa = Number.isFinite(a.data.order as number) ?
    (a.data.order as number) : Number.POSITIVE_INFINITY;
  const ob = Number.isFinite(b.data.order as number) ?
    (b.data.order as number) : Number.POSITIVE_INFINITY;
  if (oa !== ob) return oa - ob;

  // 3) title asc (stable final key)
  return a.data.title.localeCompare(b.data.title);
};

export async function getBlogList(): Promise<Array<{ title: string; path: string }>> {
  const posts = await getCollection("blog", (p) => p.data.published !== false);
  posts.sort(cmpBlog);
  return posts.map((p) => ({
    title: p.data.title,
    path: `/blog/${p.slug}/`,
  }));
}

export function isActivePath(path: string, activeId: string): boolean {
  const cleanPath = path.replace(/\/+$/, "");
  const pathSlug = cleanPath.split("/").pop() ?? "";
  const activeSlug = activeId.replace(/\.[^.]+$/, "");
  return pathSlug === activeSlug;
}
