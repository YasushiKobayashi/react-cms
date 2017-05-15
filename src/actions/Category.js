import { request, apiUrl } from '../utils';
import { Category } from '../model';

export default class {
  static get() {
    return new Promise((resolve, reject) => {
      request.GET(apiUrl('v1', 'category')).then((arr) => {
        resolve(arr.map((obj) => {
          return new Category(obj);
        }));
      }).catch((err) => {
        reject(err);
      });
    });
  }

  static post(params) {
    return new Promise((resolve, reject) => {
      request.POST(apiUrl('v1', 'category'), params).then((obj) => {
        resolve(new Category(obj));
      }).catch((err) => {
        reject(err);
      });
    });
  }
}
