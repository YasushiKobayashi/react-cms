import * as actionTypes from '../../actions/actionTypes';

const initialState = {
  isLogin: false,
  isLoading: true,
  isSsr: false,
  message: '',
  user: {
    id: null,
    name: '',
    email: '',
    image: '',
  },
  signUpUser: {
    name: '',
    email: '',
    password: '',
  },
  signInUser: {
    name: '',
    email: '',
  },
};

export default function app(state = initialState, action) {
  switch (action.type) {
    case actionTypes.LOGINED:
      return {
        ...state,
        isLoading: false,
        isLogin: true,
        user: action.user,
        message: '',
      };
    case actionTypes.LOGOUT:
      return {
        ...state,
        isLoading: false,
        isLogin: false,
        isSSr: false,
        user: initialState.user,
        message: '',
      };
    case actionTypes.LOGIN_ERROR:
      return {
        ...state,
        message: action.message,
      };
    case actionTypes.typeSsr(actionTypes.GET_USER):
      return {
        ...state,
        isSSr: false,
      };
    default:
      return state;
  }
}
