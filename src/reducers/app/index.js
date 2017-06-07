import * as actionTypes from '../../actionTypes';


const initialState = {
  isLogin: false,
  isLoading: true,
  user: {
    id: null,
    name: '',
    email: '',
    image: '',
  },
};

export default function app(state = initialState, action) {
  switch (action.type) {
    case actionTypes.LOADED:
      return {
        ...state,
        isLoading: action.isLoading,
        user: action.user,
        isLogin: true,
      };
    case actionTypes.NOT_LOGIN:
      return {
        ...state,
        isLoading: action.isLoading,
        isLogin: false,
        user: initialState.user,
      };
    default:
      return state;
  }
}
