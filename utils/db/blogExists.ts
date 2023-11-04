import { blogs } from './client.ts';
import { ObjectId } from '../../types/index.ts';

export const blogExists = async (
  blogUrl: string,
): Promise<ObjectId | false> => {
  const existingBlog = await blogs.findOne({ url: blogUrl });

  if (existingBlog?._id) {
    return existingBlog._id;
  } else {
    return false;
  }
};
