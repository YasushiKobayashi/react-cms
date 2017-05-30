import { staticImage } from '../utils';

export default class User {
  constructor(obj) {
    this.id = obj.id;
    this.name = obj.name;
    this.email = obj.email;
    this.image = (obj.image) ? obj.image : staticImage('no-image.png');
  }
}
