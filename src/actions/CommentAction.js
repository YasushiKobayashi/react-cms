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
}
