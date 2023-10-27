import { parseFeed } from 'https://deno.land/x/rss@1.0.0/mod.ts';
import { type FeedEntry } from 'https://deno.land/x/rss@1.0.0/src/types/feed.ts';
import { addBlogPost } from './index.ts';

export const processFeed = async (feedUrl: string) => {
  await fetch(feedUrl).then(
    async (result) => {
      const contentType = result.headers.get('content-type')?.split(';')[0];

      switch (contentType) {
        case 'application/rss+xml':
        case 'application/json': {
          const text = await result.text();
          const parsed = await parseFeed(text);

          parsed.entries.forEach((item: FeedEntry) => {
            addBlogPost(item);
          });

          break;
        }
        default:
      }
    },
  );
};
