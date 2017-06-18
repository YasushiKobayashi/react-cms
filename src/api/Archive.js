import { request, apiUrl } from '../utils';
import { Archive, Article } from '../model';

export default class {
  static getAllArticle(url, token = null) {
    return new Promise((resolve, reject) => {
      request.GET(apiUrl('v1', url), token).then((arr) => {
        resolve(arr.map((obj) => {
          return new Archive(obj);
        }));
      }).catch((err) => {
        reject(err);
        throw new Error(err);
      });
    });
  }

  static serachArticles(payload) {
    const params = payload.payload;
    return new Promise((resolve, reject) => {
      request.POST(apiUrl('v1', 'post/search'), params).then((arr) => {
        resolve(arr.map((obj) => {
          return new Archive(obj);
        }));
      }).catch((err) => {
        reject(err);
        throw new Error(err);
      });
    });
  }

  static getSigleArticle(id, token = null) {
    return new Promise((resolve, reject) => {
      request.GET(apiUrl('v1', `post/${id}`), token).then((obj) => {
        resolve(new Article(obj));
      }).catch((err) => {
        reject(err);
        throw new Error(err);
      });
    });
  }

  static postArticle(params) {
    return new Promise((resolve, reject) => {
      request.POST(apiUrl('v1', 'post'), params).then((obj) => {
        console.log('postArticle');
        console.log(obj);
        console.log('postArticle');
        resolve(new Article(obj));
      }).catch((err) => {
        reject(err);
        throw new Error(err);
      });
    });
  }

  static putArticle(id, params) {
    return new Promise((resolve, reject) => {
      request.PUT(apiUrl('v1', `post/${id}`), params).then((obj) => {
        resolve(new Article(obj));
      }).catch((err) => {
        reject(err);
        throw new Error(err);
      });
    });
  }
}
