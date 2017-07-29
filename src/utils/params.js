import params from 'query-params';

export default class {
  static url() {
    return window.location.href;
  }

  static getParam(url = null) {
    url = url || this.url();
    if (url.indexOf('?') === -1) {
      return '';
    }
    url = url.split('?');
    return url[1];
  }

  static decode(param = null) {
    param = param || this.getParam();
    return params.decode(param);
  }

  // static encode(param) {
  //   let url = this.url();
  //   const idQuery = url.match(/?/) ? '' : '?';
  //   url = url + idQuery + params.encode(param);
  //   return url;
  // }
}
