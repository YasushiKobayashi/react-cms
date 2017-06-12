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

// status
export const LOGINED = 'LOGINED';
export const NOT_LOGIN = 'NOT_LOGIN';

// user
export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';

// archive
export const ALL_ARCHIVES = 'ALL_ARCHIVES';
export const SORT = 'SORT';
export const SEARCH = 'SEARCH';
export const FILTER_ARTICLE = 'FILTER_ARTICLE';

// article
export const SET_ARTICLE = 'SET_ARTICLE';

export const GET_ARTICLE = 'GET_ARTICLE';
export const CREATE_ARTICLE = 'CREATE_ARTICLE';
export const EDIT_ARTICLE = 'EDIT_ARTICLE';

// comment
export const CREATE_COMMENT = 'CREATE_COMMENT';
export const EDIT_COMMENT = 'EDIT_COMMENT';
