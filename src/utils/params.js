import params from 'query-params';

export default class {
  static url() {
    return window.location.href;
  }

  static decode(url = null) {
    url = url || this.url();
    if (url.indexOf('?') === -1) {
      return false;
    }
    url = url.split('?');
    return params.decode(url[1]);
  }

  // static encode(param) {
  //   let url = this.url();
  //   const idQuery = url.match(/?/) ? '' : '?';
  //   url = url + idQuery + params.encode(param);
  //   return url;
  // }
}
