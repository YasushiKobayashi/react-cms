/* @flow */
import type { CommentType } from './CommentType';
import type { CategoryType } from './CategoryType';
import type { UserType } from './UserType';

export type ArticleType = {
  id: number;
  title: string;
  content: string;
  htmlContent: string;
  created: Date;
  updated: Date;
  wpFlg: bool;
  commentsCount: number;
  categories: Array<CategoryType>;
  comments: Array<CommentType>;
  user: UserType;
};
