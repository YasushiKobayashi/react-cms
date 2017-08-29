import cookie from 'js-cookie';

export default class {
  static write(key, param) {
    cookie.set(key, param, {
      expires: 7,
      secure: (document.location.protocol === 'https:'),
    });
  }

  static read(key) {
    const token = (key === 'token' && typeof window === 'undefined') ?
      global.token : cookie.get(key);
    return token;
  }

  static delite(key) {
    cookie.remove(key);
  }
}
