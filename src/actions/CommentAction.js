import { request, apiUrl } from '../utils';
import { Comment } from '../model';

export default class {
  static postComment(params) {
    console.log(params);
    return new Promise((resolve, reject) => {
      request.POST(apiUrl('v1', 'comment'), params).then((obj) => {
        console.log(obj);
        resolve(new Comment(obj));
      }).catch((err) => {
        reject(err);
      });
    });
  }
}
