import request from 'superagent';
import apiUrl from './apiUrl';
import cookie from './cookie';


export default class {
  /**
   * GET用のメソッド
   * @param {string} url [GETのURL]
   * @param {string} token [jwtのtokenSSRで使用する]
   * @return {object} [GETの返り値]
   */
  static GET(url, token = null) {
    if (!token) token = cookie.read('token');
    return new Promise((resolve, reject) => {
      request.get(url)
      .set('Authorization', `Bearer ${token}`)
      .end((err, res) => {
        if (err) {
          reject(err);
          throw new Error(err);
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
    const token = cookie.read('token');
    return new Promise((resolve, reject) => {
      request.post(url)
      .set('Authorization', `Bearer ${token}`)
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .send(params)
      .end((err, res) => {
        if (err) {
          reject(err);
          throw new Error(err);
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
    const token = cookie.read('token');
    return new Promise((resolve, reject) => {
      request.put(url)
      .set('Authorization', `Bearer ${token}`)
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .send(params)
      .end((err, res) => {
        if (err) {
          reject(err);
          throw new Error(err);
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
    const token = cookie.read('token');
    return new Promise((resolve, reject) => {
      request.post(apiUrl('v1', url))
      .set('Authorization', `Bearer ${token}`)
      .attach('file', files[0])
      .end((err, res) => {
        if (err) {
          reject(err);
          throw new Error(err);
        } else {
          resolve(res.body);
        }
      });
    });
  }
}
