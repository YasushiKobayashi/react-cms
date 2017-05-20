import cookie from 'js-cookie';

export default class {
  static write(key, param) {
    cookie.set(key, param, { expires: 7 });
  }

  static read(key) {
    return cookie.get(key);
  }

  static delite(key) {
    cookie.remove(key);
  }
}
