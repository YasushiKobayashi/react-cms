import { request, apiUrl } from '../utils';
import { Comment } from '../model';

export default class {
  static post(params) {
    return new Promise((resolve, reject) => {
      request.POST(apiUrl('v1', 'comment'), params).then((obj) => {
        resolve(new Comment(obj));
      }).catch((err) => {
        reject(err);
      });
    });
  }

  static put(id, params) {
    return new Promise((resolve, reject) => {
      request.PUT(apiUrl('v1', `comment/${id}`), params).then((obj) => {
        resolve(new Comment(obj));
      }).catch((err) => {
        reject(err);
      });
    });
  }
}
