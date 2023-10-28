import { blogs } from '../db.ts';
import { ObjectId } from '../types/index.ts';

export const blogExists = async (
  blogUrl: string,
): Promise<ObjectId | false> => {
  const existingBlog = await blogs.findOne({ url: blogUrl });

  if (existingBlog !== undefined) {
    return existingBlog._id;
  } else {
    return false;
  }
};
