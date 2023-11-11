import { load } from 'https://deno.land/std@0.206.0/dotenv/mod.ts';
import { MongoClient } from 'npm:mongodb@6.2.0';
import type { Blog, BlogPost, Tag } from '../../types/index.ts';

await load({ export: true });

// // Local
// const client = new MongoClient('mongodb://127.0.0.1:27017');

const client = new MongoClient(
  `mongodb+srv://${Deno.env.get('MONGO_USER')}:${Deno.env.get('MONGO_PW')}@${
    Deno.env.get('MONGO_DOMAIN')
  }/deno?authMechanism=SCRAM-SHA-1`,
);

await client.connect();

const db = client.db(Deno.env.get('MONGO_DB'));

export const blogs = db.collection<Blog>('blogs');
export const blogPosts = db.collection<BlogPost>('blogPosts');
export const tags = db.collection<Tag>('tags');
