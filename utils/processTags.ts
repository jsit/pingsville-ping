import type { ObjectId } from '../types/index.ts';
import { tags as tagsDb } from '../db.ts';

export const processTags = (tags: string[]): Promise<ObjectId[]> => {
  // Split tags by comma, if necessary
  const splitTags: string[] = tags.reduce((acc: string[], tag: string) => {
    const splitTags = tag.split(',');
    return [...acc, ...splitTags];
  }, []);

  return Promise.all(splitTags.map(async (tag) => {
    const existingTag = await tagsDb.findOne({ name: tag });

    return existingTag?._id ?? await tagsDb.insertOne({ name: tag });
  }));
};
