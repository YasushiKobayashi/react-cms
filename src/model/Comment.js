export default class Comment {
  constructor(obj) {
    this.id = obj.id;
    // this.userId = obj.user_id;
    this.dateObj = new Date(obj.updated);
    this.content = obj.content;
  }
}
