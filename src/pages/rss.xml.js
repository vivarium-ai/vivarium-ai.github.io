import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { getBlogList } from '@/lib/blog';

export async function GET() {
  // const posts = await getCollection('blog', (p) => p.data.published !== false);
  const posts = await getBlogList();

  return rss({
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
