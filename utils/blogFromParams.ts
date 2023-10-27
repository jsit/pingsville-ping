import type { Blog } from '../types/index.ts';

export const blogFromParams = (params: string[]): Blog | undefined => {
  if (params.length > 2) {
    return {
      name: params[0],
      url: params[1],
      feedUrl: params[2],
      lastUpdated: new Date(),
    };
  }
};
