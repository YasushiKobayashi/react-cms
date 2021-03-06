import * as actionTypes from '../../actions/actionTypes';

const initialState = {
  article: {
    title: '',
    content: '',
    htmlContent: '',
    created: new Date(),
    updated: new Date(),
    categories: [],
  },
  valid: {
    titleError: '',
    catNameError: '',
    catSlugErrror: '',
  },
  categoryNew: {
    name: '',
    slug: '',
  },
  categoryLists: [],
  isLoading: true,
  isSsr: false,
};

export default function edit(state = initialState, action) {
  switch (action.type) {
    case actionTypes.typeLoaded(actionTypes.SET_ARTICLE):
      return {
        ...state,
        article: action.article,
        isLoading: false,
        isSSr: false,
      };
    case actionTypes.typeLoaded(actionTypes.SET_CATEGORY):
      return {
        ...state,
        categoryLists: action.categoryLists,
        article: action.article,
        isLoading: false,
        isSSr: false,
      };
    case actionTypes.typeLoaded(actionTypes.SET_CATEGORY_LIST):
      return {
        ...state,
        categoryLists: action.categoryLists,
        isLoading: false,
        isSSr: false,
      };
    case actionTypes.typeValidError(actionTypes.SET_ARTICLE):
      return {
        ...state,
        valid: action.valid,
      };
    case actionTypes.typeLoaded(actionTypes.EDIT_CATEGORY):
      return {
        ...state,
        categoryNew: action.categoryNew,
      };
    case actionTypes.typeError(actionTypes.SET_ARTICLE):
      return {
        ...state,
        errorMessage: action.errorMessage,
        isLoading: false,
        isSSr: false,
      };
    case actionTypes.typeSsr(actionTypes.SET_ARTICLE):
      return {
        ...state,
        isSSr: false,
      };
    case actionTypes.INIT_ARTICLE:
      return initialState;
    default:
      return state;
  }
}
