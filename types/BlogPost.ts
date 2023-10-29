import type { ObjectId } from './index.ts';

export interface BlogPostTag {
  id: ObjectId;
  name: string;
}

export interface BlogPostBlog {
  id: ObjectId;
  name: string;
}

export interface BlogPost {
  author: string;
  title: string;
  guid: string;
  url: string;
  blog: BlogPostBlog;
  pubDate?: Date;
  tags?: BlogPostTag[];
  description?: string;
}
