import * as actionTypes from '../../actions/actionTypes';

const initialState = {
  archives: [],
  isLoading: true,
  msessage: '',
  isModalOpen: false,
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
        isModalOpen: true,
      };
    case actionTypes.typeLoaded(actionTypes.SET_USER):
      return {
        ...state,
        user: action.user,
        isLoading: false,
        isModalOpen: false,
      };
    case actionTypes.typeLoaded(actionTypes.USER_ARTICLE):
      return {
        ...state,
        archives: action.archives,
        isLoading: false,
        isModalOpen: false,
      };
    case actionTypes.typeError(actionTypes.USER_ARTICLE):
      return {
        ...state,
        isLoading: false,
        isModalOpen: false,
      };
    default:
      return state;
  }
}
