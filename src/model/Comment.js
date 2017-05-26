import User from './User';

export default class Comment {
  constructor(obj) {
    this.id = obj.id;
    this.user = new User(obj.user);
    this.dateObj = new Date(obj.updated);
    this.content = obj.content;
  }
}
