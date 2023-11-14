import { type Blog, ObjectId } from '../../types/index.ts';
import { blogs } from './client.ts';

export const insertBlog = async (blog: Blog): Promise<ObjectId> => {
  const newBlog = await blogs.insertOne(blog);
  return new ObjectId(newBlog.insertedId);
};
