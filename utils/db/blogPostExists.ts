import { blogPosts } from './client.ts';
import { type BlogPost } from '../../types/index.ts';

export const blogPostExists = async (blogPost: BlogPost): Promise<boolean> => {
  if (
    await blogPosts.countDocuments({ guid: blogPost.guid }) !== 0 ||
    await blogPosts.countDocuments({ url: blogPost.url }) !== 0
  ) {
    return true;
  } else {
    return false;
  }
};
