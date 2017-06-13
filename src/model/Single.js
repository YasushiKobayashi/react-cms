import _ from 'lodash';

import { editContent } from '../utils';
import { Comment, Category } from './';

export default class Single {
  constructor(obj) {
    this.id = obj.id;
    this.title = obj.title;
    this.created = new Date(obj.created);
    this.updated = new Date(obj.updated);
    this.content = obj.content;
    this.htmlContent = editContent.toHtml(obj.content);
    this.commentsCount = _.size(obj.comments);
    this.comments = (obj.comments !== null) ?
      obj.comments.map((commnet) => {
        return new Comment(commnet);
      }) : null;
    this.categories = obj.categories.map((category) => {
      return new Category(category);
    });
  }
}
