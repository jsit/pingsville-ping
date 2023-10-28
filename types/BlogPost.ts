import type { ObjectId } from './index.ts';

export interface BlogPost {
  _id: ObjectId;
  author: string;
  title: string;
  blogId: ObjectId;
  guid: string;
  url: string;
  pubDate?: Date;
  tags?: ObjectId[];
  description?: string;
}
