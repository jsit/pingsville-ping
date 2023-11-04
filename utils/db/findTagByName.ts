import type { Tag } from '../../types/index.ts';
import { tags as tagsDb } from './client.ts';

export const findTagByName = async (name: string): Promise<Tag | undefined> => {
  return await tagsDb.findOne({ name });
};
