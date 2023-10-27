import type { Blog } from '../types/Blog.ts';
import { blogs } from '../db.ts';

export const addBlog = async (blog: Blog): Promise<void> => {
  await blogs.insertOne(blog);
};
