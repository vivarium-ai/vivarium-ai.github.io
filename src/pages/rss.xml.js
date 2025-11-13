import rss from '@astrojs/rss';
import { getBlogList } from '@/lib/blog';

export async function GET() {
  const posts = await getBlogList();

  return rss({
    xmlns: {
      atom: 'http://www.w3.org/2005/Atom',
    },
    customData: `<atom:link href="${import.meta.env.SITE}/rss.xml" rel="self" type="application/rss+xml" />`,
    title: 'Vivarium AI Blog',
    description: 'An experimental platform for real AI.',
    site: import.meta.env.SITE,
    items: posts.map((post) => ({
      title: post.title,
      pubDate: post.date,
      description: "", // post.data.description,
      link: `${post.path}`,
    })),
  });
}
