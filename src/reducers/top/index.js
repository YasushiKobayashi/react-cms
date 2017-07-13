import * as actionTypes from '../../actions/actionTypes';


const initialState = {
  archives: [],
  categories: [],
  selectedCat: [],
  count: 0,
  isLoading: true,
  isSsr: false,
};

export default function top(state = initialState, action) {
  switch (action.type) {
    case actionTypes.typeLoaded(actionTypes.ALL_ARCHIVES):
      return {
        ...state,
        categories: action.categories,
        archives: action.archives,
        count: action.count,
        isLoading: false,
      };
    case actionTypes.typeLoaded(actionTypes.FILTER_ARTICLE):
      return {
        ...state,
        archives: action.archives,
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
