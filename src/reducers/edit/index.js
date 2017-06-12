import * as actionTypes from '../../actionTypes';


const initialState = {
  article: {
    title: '',
    content: '',
    htmlContent: '',
    created: new Date(),
    updated: new Date(),
  },
  isLoading: true,
};

export default function article(state = initialState, action) {
  switch (action.type) {
    case actionTypes.typeLoaded(actionTypes.SET_ARTICLE):
      return {
        ...state,
        article: action.article,
        isLoading: false,
      };
    default:
      return state;
  }
}
