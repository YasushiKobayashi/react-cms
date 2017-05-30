import config from '../config';

/**
 * [config指定のapiURLをもとにバージョン・パスを含めて返す]
 * @param  {string} version [APIのバージョン]
 * @param  {string} path    [APIのパス]
 * @return {string}         [APIのURL]
 */
export default (version, path) => {
  const versionPath = `${version}/${path}`;
  return config.apiUrl + versionPath;
};
