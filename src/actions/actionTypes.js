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
