import type { User } from './User';

export type ArticleType = {
  id: number;
  user: User;
  content: string;
  created: Date;
  updated: Date;
};
