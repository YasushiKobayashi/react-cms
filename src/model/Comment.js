import type { CommentType } from '../types/CommentType';
import type { UserType } from '../types/UserType';

import User from './User';
import { editContent } from '../utils';

export default class Comment {
  id: number;
  user: UserType;
  content: string;
  created: Date;
  updated: Date;

  constructor(obj: CommentType) {
    this.id = obj.id;
    this.user = new User(obj.user);
    this.created = new Date(obj.created);
    this.updated = new Date(obj.updated);
    this.content = obj.content;
    this.htmlContent = editContent.toHtml(obj.content);
  }
}
