import type { Blog, ObjectId } from '../../types/index.ts';
import { blogs } from './client.ts';

export const insertBlog = async (blog: Blog): Promise<ObjectId> => {
  return await blogs.insertOne(blog);
}
