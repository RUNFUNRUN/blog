'use server';

import { cache } from 'react';

type OGMetadata = {
  title: string;
  description: string;
  image: string;
  url: string;
};

const decodeHTMLEntities = (input: string): string => {
  const entities: { [key: string]: string } = {
    amp: '&',
    lt: '<',
    gt: '>',
    quot: '"',
    '#39': "'",
    apos: "'",
    nbsp: ' ',
  };

  const decoded = input.replace(/&([^;]+);/g, (match, entity) => {
    if (Object.hasOwn(entities, entity)) {
      return entities[entity];
    }
    if (entity.startsWith('#x')) {
      const code = Number.parseInt(entity.slice(2), 16);
      return String.fromCharCode(code);
    }
    if (entity.startsWith('#')) {
      const code = Number.parseInt(entity.slice(1), 10);
      return String.fromCharCode(code);
    }
    return match;
  });
  return decoded === input ? decoded : decodeHTMLEntities(decoded);
};

export const fetchOGMetadata = cache(
  async (url: string): Promise<Partial<OGMetadata>> => {
    try {
      const response = await fetch(url);

      const html = await response.text();

      const getMetaContent = (property: string) => {
        const regex = new RegExp(
          `<meta[^>]*?(?:property|name)=["']${property}["'][^>]*?content=["']([^"'>]+)["'][^>]*?>`,
          'i',
        );

        const metaContentMatch = regex.exec(html)?.[1];
        return metaContentMatch
          ? decodeHTMLEntities(metaContentMatch)
          : undefined;
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
    } catch {
      return { url };
    }
  },
);
