import type { BlogPostTag } from '../types/index.ts';
import { tags as tagsDb } from '../db.ts';

export const processTags = async (tags: string[]): Promise<BlogPostTag[]> => {
  // Split tags by comma, if necessary
  const splitTags: string[] = tags.reduce((acc: string[], tag: string) => {
    const splitTags = tag.split(',');
    return [...acc, ...splitTags];
  }, []);

  const blogPostTags: BlogPostTag[] = [];

  // Need to do a traditional loop so that newly created tags are found for
  // multiple posts that have them
  for (const tag of splitTags) {
    // deno-lint-ignore no-control-regex
    const normalizedTag = tag.replace(/([^\x00-\x7F]\s)/g, '').replace(
      /\s/g,
      '',
    )
      .trim().toLowerCase();
    const existingTag = await tagsDb.findOne({ name: normalizedTag });
    const blogPostTag = {
      id: existingTag?._id ?? await tagsDb.insertOne({ name: normalizedTag }),
      name: tag,
    };

    blogPostTags.push(blogPostTag);
  }

  return blogPostTags;
};
