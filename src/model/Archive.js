/* @flow */
import _ from 'lodash';

import type { CommentType } from '../types/CommentType';
import type { CategoryType } from '../types/CategoryType';
import type { UserType } from '../types/UserType';

import User from './User';

export default class Archive {
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

  constructor(obj: any) {
    this.id = obj.id;
    this.title = obj.title;
    this.created = new Date(obj.created);
    this.updated = new Date(obj.updated);
    this.content = obj.content;
    this.wpFlg = obj.wp_flg;
    this.commentsCount = _.size(obj.comments);
    this.user = new User(obj.user);
  }
}
