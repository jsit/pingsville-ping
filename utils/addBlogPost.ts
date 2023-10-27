import type { BlogPost } from '../types/index.ts';
import { blogPosts } from '../db.ts';
import { blogPostExists } from './index.ts';
import { type FeedEntry } from 'https://deno.land/x/rss@1.0.0/src/types/feed.ts';

export const addBlogPost = async (blogPost: FeedEntry) => {
  const formattedBlogPost: BlogPost = {
    author: blogPost.author?.name || '',
    title: blogPost.title?.value || '',
    guid: blogPost.id,
    pubDate: blogPost.published,
    tags: blogPost.categories?.filter((category) => category.term).map(
      (category) => category.term || '',
    ),
  };

  if (!(await blogPostExists(blogPost.id))) {
    await blogPosts.insertOne(formattedBlogPost);
  }
};
