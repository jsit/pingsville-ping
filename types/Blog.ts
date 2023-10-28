import { ObjectId } from './index.ts';

export interface Blog {
  _id: ObjectId;
  name: string;
  url: string;
  feedUrl: string;
  lastUpdated: Date;
}
