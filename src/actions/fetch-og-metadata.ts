'use server';

import { cache } from 'react';

type OGData = {
  title: string;
  description: string;
  image: string;
  url: string;
};

export const fetchOGMetadata = cache(
  async (url: string): Promise<Partial<OGData>> => {
    try {
      const response = await fetch(url, {
        headers: {
          'User-Agent': 'RUNFUNRUN.dev',
        },
      });

      const html = await response.text();

      const getMetaContent = (property: string): string | undefined => {
        const regex = new RegExp(
          `<meta[^>]+(?:property|name)="${property}"[^>]+content="([^"]+)"`,
          'i',
        );
        return regex.exec(html)?.[1].replaceAll('amp;', '');
      };

      const titleMatch = /<title>(.*?)<\/title>/i.exec(html);

      const protocol = new URL(url).protocol;
      const hostname = new URL(url).hostname;
      const rawImageUrl = getMetaContent('og:image') ?? '';
      const isFullPath = rawImageUrl.startsWith('http');
      const image = isFullPath
        ? rawImageUrl
        : new URL(rawImageUrl, `${protocol}//${hostname}`).href;

      return {
        title: getMetaContent('og:title') ?? titleMatch?.[1] ?? '',
        description:
          getMetaContent('og:description') ??
          getMetaContent('description') ??
          '',
        image,
        url,
      };
    } catch (error) {
      return { url };
    }
  },
);
