import { description, title } from '@/app/layout.config';
import { getPages } from '@/libs/source';
import { Feed } from 'feed';

export const dynamic = 'force-static';

export const GET = () => {
  const baseUrl = new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000',
  );

  const feed = new Feed({
    title,
    description,
    id: baseUrl.toString(),
    copyright: 'RUNFUNRUN',
    link: baseUrl.toString(),
    feed: new URL('/api/rss.xml', baseUrl).toString(),
    language: 'ja',
    updated: new Date(),
    favicon: new URL('/favicon.ico', baseUrl).toString(),
  });

  const posts = getPages();

  for (const post of posts) {
    const imageParams = new URLSearchParams();
    imageParams.set('title', post.data.title);
    imageParams.set('description', post.data.description ?? '');

    feed.addItem({
      title: post.data.title,
      description: post.data.description,
      link: new URL(post.url, baseUrl).toString(),
      image: new URL(`/api/og?${imageParams}`, baseUrl).toString(),
      date: post.data.date,
      author: [
        {
          name: 'RUNFUNRUN',
          link: 'https://runfun.run',
        },
      ],
    });
  }

  return new Response(feed.rss2(), {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
};
