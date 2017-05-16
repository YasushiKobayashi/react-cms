import md from 'markdown-it';
import Comment from './Comment';

export default class Single {
  constructor(obj) {
    this.title = obj.title;
    this.date = obj.date;
    this.dateObj = new Date(obj.updated);
    this.content = obj.content;
    this.htmlContent = md().render(obj.content);
    this.comments = obj.comments.map((commnet) => {
      return new Comment(commnet);
    });
  }
}
