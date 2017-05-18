import request from 'superagent';
import apiUrl from './apiUrl';

export default class {
  /**
   * GET用のメソッド
   * @param {string} url [GETのURL]
   * @return {object} [GETの返り値]
   */
  static GET(url) {
    return new Promise((resolve, reject) => {
      request.get(url)
      .end((err, res) => {
        const statusCode = res.statusCode;
        if (statusCode > 299) {
          reject(err);
        } else {
          resolve(res.body);
        }
      });
    });
  }

  /**
   * JSONのPOST用のメソッド
   * @param {string} url    [POSTのURL]
   * @param {object} params [POSTする配列]
   * @return {object} POSTの返り値
   */
  static POST(url, params) {
    return new Promise((resolve, reject) => {
      request.post(url)
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .send(params)
      .end((err, res) => {
        const statusCode = res.statusCode;
        if (statusCode > 299) {
          reject(err);
        } else {
          resolve(res.body);
        }
      });
    });
  }

  /**
   * JSONのPUT用のメソッド
   * @param {string} url    [PUTのURL]
   * @param {object} params [PUTする配列]
   * @return {object} PUTの返り値
   */
  static PUT(url, params) {
    console.log(params);
    return new Promise((resolve, reject) => {
      request.put(url)
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .send(params)
      .end((err, res) => {
        console.log(res);
        const statusCode = res.statusCode;
        if (statusCode > 299) {
          reject(err);
        } else {
          resolve(res.body);
        }
      });
    });
  }

  /**
   * [ファイルアップロード用のメソッド]
   * @param {string} url   [POST先のURL（pathのみ）]
   * @param {object} files [POSTするFILEオブジェクト]
   * @return {object} アップロードした画像のパス
   */
  static UPLOAD(url, files) {
    return new Promise((resolve, reject) => {
      request.post(apiUrl('v1', url))
      .attach('file', files[0])
      .end((err, res) => {
        const statusCode = res.statusCode;
        if (statusCode > 299) {
          reject(err);
        } else {
          resolve(res.body);
        }
      });
    });
  }
}
