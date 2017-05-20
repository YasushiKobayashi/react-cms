export default class User {
  constructor(obj) {
    console.log(obj);
    this.id = obj.id;
    this.name = obj.name;
    this.email = obj.email;
    this.image = obj.image;
  }
}
