import { blogPosts } from '../db.ts';

export const blogPostExists = async (guid: string): Promise<boolean> => {
  if ((await blogPosts.countDocuments({ guid: guid })) !== 0) {
    return true;
  } else {
    return false;
  }
};
