import * as actionTypes from '../../actions/actionTypes';


const initialState = {
  article: {
    title: '',
    content: '',
    htmlContent: '',
    created: new Date(),
    updated: new Date(),
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
  categories: [],
  isLoading: true,
};

export default function edit(state = initialState, action) {
  switch (action.type) {
    case actionTypes.typeLoaded(actionTypes.SET_ARTICLE):
      return {
        ...state,
        article: action.article,
        isLoading: false,
      };
    case actionTypes.typeLoaded(actionTypes.SET_CATEGORY):
      return {
        ...state,
        categoryLists: action.categoryLists,
        categories: action.categories,
        isLoading: false,
      };
    case actionTypes.typeLoaded(actionTypes.SET_CATEGORY_LIST):
      return {
        ...state,
        categoryLists: action.categoryLists,
        isLoading: false,
      };
    case actionTypes.typeValidError(actionTypes.SET_ARTICLE):
      return {
        ...state,
        valid: action.valid,
      };
    case actionTypes.typeLoaded(actionTypes.CREATE_CATEGORY):
      return {
        ...state,
        categories: action.categories,
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
      };
    default:
      return state;
  }
}
