import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { SITE, articlePath } from '../lib/site';

export async function GET() {
  const articles = (await getCollection('articles', ({ data }) => !data.draft)).sort(
    (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf(),
  );

  return rss({
    title: SITE.name,
    description: SITE.description,
    site: SITE.url,
    items: articles.map((article) => ({
      title: article.data.title,
      description: article.data.description,
      pubDate: article.data.pubDate,
      link: articlePath(article.id),
    })),
    customData: `<language>${SITE.language}</language>`,
  });
}
