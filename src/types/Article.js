import type { Comment } from './Comment';

export type ArticleType = {
  id: number;
  title: string;
  content: string;
  htmlContent: string;
  created: Date;
  updated: Date;
  commentsCount: number;
  categories: Array;
  comments: Array<Comment>;
};
