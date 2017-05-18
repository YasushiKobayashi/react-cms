import md from 'markdown-it';
import { Comment, Category } from './';

export default class Single {
  constructor(obj) {
    this.id = obj.id;
    this.title = obj.title;
    this.date = obj.date;
    this.dateObj = new Date(obj.updated);
    this.content = obj.content;
    this.htmlContent = md().render(obj.content);
    this.comments = (obj.comments !== null) ?
      obj.comments.map((commnet) => {
        return new Comment(commnet);
      }) : null;
    this.categories = obj.categories.map((category) => {
      return new Category(category);
    });
  }
}
