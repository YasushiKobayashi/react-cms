import * as actionTypes from '../../actions/actionTypes';

const initialState = {
  archives: [],
  categories: [],
  selectedCat: [],
  count: 0,
  pageNumber: 1,
  isLoading: true,
  isSsr: false,
};

export default function top(state = initialState, action) {
  switch (action.type) {
    case actionTypes.typeLoaded(actionTypes.INIT_ARTICLE):
      return {
        ...state,
        categories: action.categories,
        isLoading: false,
      };
    case actionTypes.typeLoaded(actionTypes.COUNT):
      return {
        ...state,
        count: action.count,
      };
    case actionTypes.typeLoaded(actionTypes.FILTER_ARTICLE):
      return {
        ...state,
        archives: action.archives,
        pageNumber: action.pageNumber,
        isLoading: false,
      };
    case actionTypes.typeError(actionTypes.FILTER_ARTICLE):
      return {
        ...state,
        errorMessage: action.errorMessage,
        isLoading: false,
      };
    case actionTypes.typeError(actionTypes.ALL_ARTICLE):
      return {
        ...state,
        errorMessage: action.errorMessage,
        isLoading: false,
      };
    case actionTypes.typeSsr(actionTypes.ALL_ARCHIVES):
      return {
        ...state,
        isSSr: false,
      };
    default:
      return state;
  }
}
