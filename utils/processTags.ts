import type { ObjectId } from '../types/index.ts';
import { tags as tagsDb } from '../db.ts';

export const processTags = (
  tags: string[],
): (ObjectId | undefined)[] => {
  // Split tags by comma, if necessary
  const splitTags: string[] = tags.reduce((acc: string[], tag: string) => {
    const splitTags = tag.split(',');
    return [...acc, ...splitTags];
  }, []);

  const tagIds: (ObjectId | undefined)[] = [];

  // Need to do a traditional loop so that newly created tags are found for
  // multiple posts that have them
  const processTagLoop = async () => {
    for await (const tag of splitTags) {
      const existingTag = await tagsDb.findOne({ name: tag });
      tagIds.push(existingTag?._id ?? await tagsDb.insertOne({ name: tag }));
    }
  };

  processTagLoop();

  console.log('tags: ', tagIds);

  return tagIds;
};
