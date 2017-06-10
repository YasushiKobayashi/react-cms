export const REQUEST = 'REQUEST';
export const LOADED = 'LOADED';
export const ERROR = 'ERROR';

export const typeReqest = (type) => {
  return `${type}_${REQUEST}`;
};
export const typeLoaded = (type) => {
  return `${type}_${LOADED}`;
};
export const typeError = (type) => {
  return `${type}_${ERROR}`;
};


/**
 * sagas middoleware
 */

export const LOGINED = 'LOGINED';
export const NOT_LOGIN = 'NOT_LOGIN';

export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';

export const ARTICLE = 'ARTICLE';

export const ALL_ARTICLE = 'ALL_ARTICLE';
export const SORT = 'SORT';
export const SEARCH = 'SEARCH';
