import { request, apiUrl } from '../utils';
import { Comment } from '../model';

export default class {
  static postComment(params) {
    return new Promise((resolve, reject) => {
      request.POST(apiUrl('v1', 'comment'), params).then((obj) => {
        resolve(new Comment(obj));
      }).catch((err) => {
        reject(err);
      });
    });
  }

  static putComment(id, params) {
    console.log(params);
    return new Promise((resolve, reject) => {
      request.PUT(apiUrl('v1', `comment/${id}`), params).then((obj) => {
        resolve(new Comment(obj));
      }).catch((err) => {
        reject(err);
      });
    });
  }
}
