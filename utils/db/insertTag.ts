import { ObjectId, type Tag } from '../../types/index.ts';
import { tags } from './client.ts';

export const insertTag = async (tag: Tag): Promise<ObjectId> => {
  const newTag = await tags.insertOne(tag);
  return new ObjectId(newTag.insertedId);
};
