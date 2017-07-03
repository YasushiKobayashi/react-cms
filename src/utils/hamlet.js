import config from '../config';
import staticImage from './staticImage';

export default class {
  static title(title) {
    return (title) ? `${title} | ${config.siteTitle}` : config.siteTitle;
  }

  static meta(title, image = staticImage('no-image.png')) {
    title = this.title(title);
    return [
      { name: 'twitter:title', content: title },
      { name: 'twitter:description', content: title },
      { name: 'twitter:image', content: image },
      { property: 'og:title', content: title },
      { property: 'og:description', content: title },
      { property: 'og:image', content: image },
    ];
  }
}
