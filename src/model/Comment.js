import User from './User';

export default class Comment {
  constructor(obj) {
    this.id = obj.id;
    this.user = new User(obj.user);
    this.created = new Date(obj.created);
    this.updated = new Date(obj.updated);
    this.content = obj.content;
  }
}
