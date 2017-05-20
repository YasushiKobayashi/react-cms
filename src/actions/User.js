import { request, apiUrl } from '../utils';
import { User } from '../model';

export default class {
  static get(url) {
    return new Promise((resolve, reject) => {
      request.GET(apiUrl('v1', url)).then((obj) => {
        resolve(new User(obj));
      }).catch((err) => {
        reject(err);
      });
    });
  }
}
