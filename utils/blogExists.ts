import { blogs } from '../db.ts';

export const blogExists = async (blogUrl: string): Promise<boolean> => {
  if ((await blogs.countDocuments({ url: blogUrl })) !== 0) {
    return true;
  } else {
    return false;
  }
};
