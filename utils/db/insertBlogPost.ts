import type { BlogPost } from '../../types/index.ts';
import { blogPosts } from './client.ts';

export const insertBlogPost = async (blogPost: BlogPost) => {
  await blogPosts.insertOne(blogPost);
};
