import type { ObjectId } from './index.ts';

export interface BlogPost {
  author: string;
  title: string;
  guid: string;
  url: string;
  blogId?: ObjectId;
  summary?: string;
  pubDate?: Date;
  tags?: ObjectId[];
  description?: string;
}
