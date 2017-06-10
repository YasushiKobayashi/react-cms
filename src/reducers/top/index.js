import * as actionTypes from '../../actionTypes';


const initialState = {
  archives: [],
  categories: [],
  selectedCat: [],
};

export default function top(state = initialState, action) {
  switch (action.type) {
    case actionTypes.typeLoaded(actionTypes.ALL_ARTICLE):
      return {
        ...state,
        categories: action.categories,
        archives: action.archives,
        isLoading: false,
      };
    case actionTypes.typeLoaded(actionTypes.ARTICLE):
      return {
        ...state,
        archives: action.archives,
        isLoading: false,
      };
    case actionTypes.typeError(actionTypes.ALL_ARTICLE):
      return {
        ...state,
        isLoading: false,
      };
    default:
      return state;
  }
}
