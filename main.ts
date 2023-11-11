import xmlrpc from 'npm:davexmlrpc@^0.4.26';
import type { XmlRequest } from './types/index.ts';
import { xmlRpcConfig } from './config.ts';
import { blogFromParams, processFeed } from './utils/index.ts';
import { blogExists, insertBlog } from './utils/db/index.ts';

const handleRequest = async (
  { verb, params, returnVal }: XmlRequest,
): Promise<boolean> => {
  switch (verb) {
    case 'weblogUpdates.extendedPing':
      if (params.length > 2) {
        // Create a Blog object from the string params
        const blog = blogFromParams(params);

        if (blog !== undefined) {
          console.log('Extended ping!\nThis is the blog title: ', blog.name);
          console.log('This is the blog homepage: ', blog.url);
          console.log('This is the blog feed: ', blog.feedUrl);

          // Get ObjectId (or undefined) of existing blog, if it exists
          const existingBlog = await blogExists(blog.url);

          if (!existingBlog) {
            console.log('We don\'t know this blog; add it to the collection.');

            // We don't know this blog; add it to the blogs collection
            const blogId = await insertBlog(blog);

            // Process the feed for this blog
            await processFeed({
              url: blog.feedUrl,
              blogId: blogId,
              blogName: blog.name,
            });
          } else {
            console.log('This is a known blog.');

            // TODO: update blog with new lastupdated date

            // Process the feed for this blog
            await processFeed({
              url: blog.feedUrl,
              blogId: existingBlog,
              blogName: blog.name,
            });
          }
        }

        returnVal(
          undefined,
          `Your blog title is ${blog?.name}, and its RSS feed is at ${blog?.feedUrl}`,
        );
      } else {
        returnVal(
          {
            name: 'Not enough parameters',
            message:
              'There must be at least three parameters to perform an extended ping.',
          },
          undefined,
        );
      }
      return true; // we handled it

    case 'weblogUpdates.ping':
      if (params.length > 1) {
        console.log('Standard ping!\nThis is the blog title: ', params[0]);
        console.log('This is the blog homepage: ', params[1]);

        returnVal(
          undefined,
          `Your blog title is ${params[0]}, and its homepage is at ${
            params[1]
          }`,
        );
      } else {
        returnVal(
          {
            name: 'Not enough parameters',
            message: 'There must be at least two parameter to perform a ping.',
          },
          undefined,
        );
      }
      return true; // we handled et

    default:
      returnVal(
        {
          name: 'Not a recognized verb',
          message:
            'Verb must be weblogUpdates.extendedPing or weblogUpdates.ping.',
        },
        undefined,
      );
      return false;
  }
};

xmlrpc.startServerOverHttp(xmlRpcConfig, handleRequest);
