import * as actionTypes from '../../actions/actionTypes';

const initialState = {
  archives: [],
  isLoading: true,
  user: {
    id: null,
    name: '',
    email: '',
    image: '',
  },
};

export default function mypage(state = initialState, action) {
  switch (action.type) {
    case actionTypes.typeLoaded(actionTypes.USER_ARTICLE):
      return {
        ...state,
        archives: action.archives,
        isLoading: false,
      };
    case actionTypes.typeError(actionTypes.USER_ARTICLE):
      return {
        ...state,
        isLoading: false,
      };
    default:
      return state;
  }
}
