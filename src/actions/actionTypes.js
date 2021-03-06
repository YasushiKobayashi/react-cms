export const REQUEST = 'REQUEST';
export const LOADED = 'LOADED';
export const ERROR = 'ERROR';
export const VALID_ERROR = 'VALID_ERROR';

export const typeReqest = (type) => {
  return `${type}_${REQUEST}`;
};
export const typeLoaded = (type) => {
  return `${type}_${LOADED}`;
};
export const typeError = (type) => {
  return `${type}_${ERROR}`;
};
export const typeValidError = (type) => {
  return `${type}_${VALID_ERROR}`;
};

export const typeSsr = (type) => {
  return `${type}_SSR`;
};

// status
export const LOGINED = 'LOGINED';
export const NOT_LOGIN = 'NOT_LOGIN';
export const LOGIN_ERROR = 'LOGIN_ERROR';

// user
export const LOGIN = 'LOGIN';
export const REGIST = 'REGIST';
export const LOGOUT = 'LOGOUT';

export const USER_ARTICLE = 'USER_ARTICLE';
export const SET_USER = 'SET_USER';
export const GET_USER = 'GET_USER';
export const UPDATE_USER = 'UPDATE_USER';

// archive
export const ARCHIVES_INIT = 'ARCHIVES_INIT';
export const ARCHIVES = 'ARCHIVES';
export const COUNT = 'COUNT';
export const SORT = 'SORT';
export const SEARCH = 'SEARCH';
export const GET_FROM_CATEGORY = 'GET_FROM_CATEGORY';
export const FILTER_ARTICLE = 'FILTER_ARTICLE';

// article
export const INIT_ARTICLE = 'INIT_ARTICLE';
export const SET_ARTICLE = 'SET_ARTICLE';

export const GET_ARTICLE = 'GET_ARTICLE';
export const CREATE_ARTICLE = 'CREATE_ARTICLE';
export const EDIT_ARTICLE = 'EDIT_ARTICLE';
export const PUT_ARTICLE = 'PUT_ARTICLE';

// category
export const SET_CATEGORY = 'SET_CATEGORY';
export const SET_CATEGORY_LIST = 'SET_CATEGORY_LIST';

export const GET_CATEGORIES = 'GET_CATEGORIES';
export const CREATE_CATEGORY = 'CREATE_CATEGORY';
export const EDIT_CATEGORY = 'EDIT_CATEGORY';

export const ADD_CATEGORIES = 'ADD_CATEGORIES';
export const REMOVE_CATEGORIES = 'REMOVE_CATEGORIES';

export const EDIT_CAT_NAME = 'EDIT_CAT_NAME';
export const EDIT_CAT_SLUG = 'EDIT_CAT_SLUG';

// comment
export const CREATE_COMMENT = 'CREATE_COMMENT';
export const EDIT_COMMENT = 'EDIT_COMMENT';
