import { getPages } from '@/libs/source';
import RSS from 'rss';

const url = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.runfunrun.dev';

export const revalidate = 60 * 60 * 24 * 1;

export const GET = () => {
  const feed = new RSS({
    title: 'RUNFUNRUN.dev',
    description: 'This is my tech blog.',
    site_url: url,
    feed_url: `${url}/rss.xml`,
    language: 'ja',
  });

  const pages = getPages();

  for (const page of pages) {
    feed.item({
      title: page.data.title,
      description: page.data.description ?? '',
      url: new URL(page.url, url).toString(),
      date: page.data.date,
    });
  }

  return new Response(feed.xml(), {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': `s-maxage=${revalidate}, stale-while-revalidate`,
    },
  });
};
