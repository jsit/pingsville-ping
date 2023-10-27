import { MongoClient } from 'https://deno.land/x/mongo@v0.32.0/mod.ts';
import type { Blog, BlogPost } from './types/index.ts';

const client = new MongoClient();

await client.connect('mongodb://127.0.0.1:27017');

const db = client.database('pingsville');

export const blogs = db.collection<Blog>('blogs');
export const blogPosts = db.collection<BlogPost>('blogPosts');
