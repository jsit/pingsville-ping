import type { ObjectId } from '../types/index.ts';

export interface Tag {
  _id?: ObjectId;
  name: string;
  displayName: string;
};
