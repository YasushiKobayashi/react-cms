import config from '../config';

/**
 * [画像のパスを返す]
 * @param  {string} path [画像のファイル名]
 * @return {string}      [URLのフルパス]
 */
export default (path) => {
  return `${config.url}assets/img/${path}`;
};
