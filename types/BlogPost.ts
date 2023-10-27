export interface BlogPost {
  author: string;
  title: string;
  guid?: string;
  pubDate?: Date;
  tags?: string[];
  description?: string;
}
