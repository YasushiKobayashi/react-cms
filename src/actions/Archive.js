import { request, apiUrl } from '../utils';
import { Archive, Single } from '../model';

export default class {
  static getList() {
    return new Promise((resolve, reject) => {
      request.GET(apiUrl('v1', 'post')).then((arr) => {
        resolve(arr.map((obj) => {
          return new Archive(obj);
        }));
      }).catch((err) => {
        reject(err);
      });
    });
  }


  static getSigleArticle(id) {
    return new Promise((resolve, reject) => {
      request.GET(apiUrl('v1', `post/${id}`)).then((obj) => {
        resolve(new Single(obj));
      }).catch((err) => {
        reject(err);
      });
    });
  }

  static postArticle(params) {
    return new Promise((resolve, reject) => {
      request.POST(apiUrl('v1', 'post'), params).then((obj) => {
        resolve(new Single(obj));
      }).catch((err) => {
        reject(err);
      });
    });
  }
}
