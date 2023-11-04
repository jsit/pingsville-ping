import Parser from 'npm:rss-parser@^3.13.0';
import type { BlogPost, ObjectId } from '../types/index.ts';
import { insertBlogPost } from '../utils/db/index.ts';
import { blogPostFromItem, processTags } from './index.ts';
import { blogPostExists } from './db/index.ts';

interface processFeedProps {
  url: string;
  blogId: ObjectId;
  blogName: string;
}

export const processFeed = async (
  { url, blogId, blogName }: processFeedProps,
): Promise<boolean> => {
  await fetch(url).then(
    async (result) => {
      const contentType = result.headers.get('content-type')?.split(';')[0];

      switch (contentType) {
        case 'application/rss+xml':
        case 'application/xml':
        case 'text/xml':
        case 'application/json': {
          const parser = new Parser({
            customFields: {
              item: [
                ['media:keywords', 'keywords'],
              ],
            },
          });
          const text = await result.text();
          const parsed = await parser.parseString(text);

          // Need to do a traditional loop so that newly created tags are found for
          // multiple posts that have them
          for (const item of parsed.items) {
            // Create a BlogPost object from this item
            const blogPost: BlogPost = {
              ...blogPostFromItem(item),
              blog: {
                name: blogName,
                id: blogId,
              },
            };

            const allCategories = [
              ...(item?.categories ? item?.categories : []),
              ...(item?.keywords ? [item?.keywords] : []),
            ];

            // If we don't already have the blog post, insert it
            if (!(await blogPostExists(blogPost))) {
              const tags = await processTags(allCategories);

              const taggedBlogPost: BlogPost = {
                ...blogPost,
                tags,
              };

              await insertBlogPost(taggedBlogPost);
            }
          }
          return true;
        }
        default:
          return false;
      }
    },
  );

  return false;
};
