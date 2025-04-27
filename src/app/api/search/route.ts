import { getPosts } from '@/lib/source';
import { createSearchAPI } from 'fumadocs-core/search/server';

export const { GET } = createSearchAPI('advanced', {
  indexes: getPosts().map((post) => ({
    title: post.data.title,
    structuredData: post.data.structuredData,
    id: post.url,
    url: post.url,
  })),
});
