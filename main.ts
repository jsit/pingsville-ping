import xmlrpc from 'npm:davexmlrpc@^0.4.26';
import type { XmlRequest } from './types/index.ts';
import {
  addBlog,
  blogExists,
  blogFromParams,
  processFeed,
} from './utils/index.ts';

const config = {
  port: 1417,
  xmlRpcPath: '/',
};

const handleRequest = async (request: XmlRequest): Promise<boolean> => {
  const { verb, params, returnVal } = request;

  switch (verb) {
    case 'weblogUpdates.extendedPing':
      if (params.length > 2) {
        const blog = blogFromParams(params);

        if (blog !== undefined) {
          console.log('Extended ping!\nThis is the blog title: ', blog.name);
          console.log('This is the blog homepage: ', blog.url);
          console.log('This is the blog feed: ', blog.feedUrl);

          console.log(
            'Does this blog already exist?: ',
            await blogExists(blog.url),
          );

          await processFeed(blog.feedUrl);

          if (!(await blogExists(blog.url))) {
            await addBlog(blog);
          } else {
            // update blog with new lastupdated date
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

xmlrpc.startServerOverHttp(config, handleRequest);
