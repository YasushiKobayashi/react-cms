/* @flow */
import type { UserType } from './UserType';

export type CommentType = {
  id: number;
  user: UserType;
  content: string;
  htmlContent: string;
  created: Date;
  updated: Date;
};
