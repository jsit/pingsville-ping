import type { ObjectId } from '../../types/index.ts';
import type { Tag } from '../../types/index.ts';
import { tags as tagsDb } from './client.ts';

export const insertTag = async (tag: Tag): Promise<ObjectId> => {
  return await tagsDb.insertOne(tag);
};
