export default class Archive {
  constructor(obj) {
    this.id = obj.id;
    this.title = obj.title;
    this.date = obj.updated;
    this.dateObj = new Date(obj.updated);
    this.excerpt = obj.content.substr(0, 280);
    this.content = obj.content;
  }
}
