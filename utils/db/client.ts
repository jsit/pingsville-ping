import { load } from 'https://deno.land/std@0.206.0/dotenv/mod.ts';
import { MongoClient } from 'https://deno.land/x/atlas_sdk@v1.1.1/mod.ts';
import type { BannedHost, Blog, BlogPost, Tag } from '../../types/index.ts';

await load({ export: true });

// // Local
// const client = new MongoClient('mongodb://127.0.0.1:27017');

const client = new MongoClient({
  endpoint: `https://data.mongodb-api.com/app/${
    Deno.env.get('ATLAS_APP_ID')
  }/endpoint/data/v1`,
  dataSource: Deno.env.get('ATLAS_CLUSTER') || '',
  auth: {
    apiKey: Deno.env.get('ATLAS_API_KEY') || '',
  },
});

const db = client.database(Deno.env.get('ATLAS_DB') || '');

export const blogs = db.collection<Blog>('blogs');
export const blogPosts = db.collection<BlogPost>('blogPosts');
export const tags = db.collection<Tag>('tags');
export const bannedHosts = db.collection<BannedHost>('bannedHosts');
