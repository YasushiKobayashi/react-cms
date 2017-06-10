import params from 'query-params';

export default class {
  static url() {
    return window.location.href;
  }

  static decode() {
    let url = this.url();
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
