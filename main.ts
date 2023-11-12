import xmlrpc from 'npm:davexmlrpc@^0.4.26';
import type { XmlRequest } from './types/index.ts';
import { blogFromParams, processFeed } from './utils/index.ts';
import { blogExists, insertBlog } from './utils/db/index.ts';

const xmlHandler = (
  err: Error,
  verb: string | undefined,
  params: string[] | undefined,
): Response | Promise<Response> => {
  function returnXml(xval: string): Response {
    const xmltext = xmlrpc.getReturnText(xval);

    return new Response(xmltext, {
      headers: {
        'Content-Length': xmltext.length,
        'Content-Type': 'text/xml',
      },
    });
  }

  function returnErrorXml(xval: Error): Response {
    return new Response(xmlrpc.getFaultText(xval), {
      status: 500,
      headers: {
        'Content-Type': 'text/xml',
      },
    });
  }

  function httpReturnXml(
    err: Error | undefined,
    xval: string,
  ): Response {
    if (err) {
      return returnErrorXml(err);
    } else {
      return returnXml(xval);
    }
  }

  if (err) {
    return returnErrorXml(err);
  } else {
    const xmlRpcRequest = {
      err: '',
      verb,
      params,
      returnVal: httpReturnXml,
    };

    return handleRequest(xmlRpcRequest);
  }
};

const handleRequest = async (
  { verb, params, returnVal }: XmlRequest,
): Promise<Response> => {
  switch (verb) {
    case 'weblogUpdates.extendedPing':
      if (params && params.length > 2) {
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

        return returnVal(
          undefined,
          `Your blog title is ${blog?.name}, and its RSS feed is at ${blog?.feedUrl}`,
        );
      } else {
        return returnVal(
          {
            name: 'Not enough parameters',
            message:
              'There must be at least three parameters to perform an extended ping.',
          },
          '',
        );
      }

    case 'weblogUpdates.ping':
      if (params && params.length > 1) {
        console.log('Standard ping!\nThis is the blog title: ', params[0]);
        console.log('This is the blog homepage: ', params[1]);

        return returnVal(
          undefined,
          `Your blog title is ${params[0]}, and its homepage is at ${
            params[1]
          }`,
        );
      } else {
        return returnVal(
          {
            name: 'Not enough parameters',
            message: 'There must be at least two parameter to perform a ping.',
          },
          '',
        );
      }

    default:
      return returnVal(
        {
          name: 'Not a recognized verb',
          message:
            'Verb must be weblogUpdates.extendedPing or weblogUpdates.ping.',
        },
        '',
      );
  }
};

const handler = async (req: Request): Promise<Response> => {
  const requestBody = await req.text();

  let response;

  xmlrpc.server(requestBody, (
    err: Error,
    verb: string | undefined,
    params: string[] | undefined,
  ) => {
    response = xmlHandler(err, verb, params);
  });

  return response || new Response('Something went wrong', {
    status: 500,
  });
};

Deno.serve({ port: 1417 }, handler);

// xmlrpc.startServerOverHttp(xmlRpcConfig, handleRequest);
