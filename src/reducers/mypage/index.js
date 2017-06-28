import * as actionTypes from '../../actions/actionTypes';

const initialState = {
  archives: [],
  isLoading: true,
  msessage: '',
  user: {
    id: null,
    name: '',
    email: '',
    image: '',
  },
};

export default function mypage(state = initialState, action) {
  switch (action.type) {
    case actionTypes.typeLoaded(actionTypes.UPDATE_USER):
      return {
        ...state,
        msessage: action.msessage,
      };
    case actionTypes.typeLoaded(actionTypes.SET_USER):
      return {
        ...state,
        user: action.user,
        isLoading: false,
        msessage: '',
      };
    case actionTypes.typeLoaded(actionTypes.USER_ARTICLE):
      return {
        ...state,
        archives: action.archives,
        isLoading: false,
        msessage: '',
      };
    case actionTypes.typeError(actionTypes.USER_ARTICLE):
      return {
        ...state,
        isLoading: false,
        msessage: '',
      };
    default:
      return state;
  }
}
