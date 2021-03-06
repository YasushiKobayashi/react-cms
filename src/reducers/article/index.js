import * as actionTypes from '../../actions/actionTypes';


const initialState = {
  article: {
    title: '',
    content: '',
    htmlContent: '',
    created: new Date(),
    updated: new Date(),
  },
  isLoading: true,
  isSsr: false,
  isCommentSaveFlg: false,
};

export default function article(state = initialState, action) {
  switch (action.type) {
    case actionTypes.typeLoaded(actionTypes.SET_ARTICLE):
      return {
        ...state,
        article: action.article,
        isLoading: false,
        isSSr: false,
        isCommentSaveFlg: true,
      };
    case actionTypes.typeError(actionTypes.SET_ARTICLE):
      return {
        ...state,
        errorMessage: action.errorMessage,
        isLoading: false,
        isSSr: false,
        isCommentSaveFlg: false,
      };
    case actionTypes.typeSsr(actionTypes.SET_ARTICLE):
      return {
        ...state,
        isSSr: false,
        isCommentSaveFlg: false,
      };
    default:
      return state;
  }
}
