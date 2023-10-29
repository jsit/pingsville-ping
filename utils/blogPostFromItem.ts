import type { BlogPost, Item } from '../types/index.ts';

export const blogPostFromItem = (item: Item): BlogPost => {
  const formattedBlogPost: BlogPost = {
    author: item.creator || '',
    title: item.title || '',
    guid: item.guid || '',
    description: item.contentSnippet,
    pubDate: item.pubDate ? new Date(item?.pubDate) : undefined,
    url: item.link || '',
  };

  return formattedBlogPost;
};
