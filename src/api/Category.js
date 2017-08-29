import { request, apiUrl } from '../utils';
import { Category } from '../model';

export default class {
  static get(token = null) {
    return new Promise((resolve, reject) => {
      request.GET(apiUrl('v1', 'categories'), token).then((arr) => {
        resolve(arr.map((obj) => {
          return new Category(obj);
        }));
      }).catch((err) => {
        reject(err);
        throw new Error(err);
      });
    });
  }

  static post(params) {
    return new Promise((resolve, reject) => {
      request.POST(apiUrl('v1', 'categories'), params).then((obj) => {
        resolve(new Category(obj));
      }).catch((err) => {
        reject(err);
        throw new Error(err);
      });
    });
  }
}
