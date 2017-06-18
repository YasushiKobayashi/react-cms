import * as actionTypes from '../../actions/actionTypes';


const initialState = {
  isLogin: false,
  isLoading: true,
  isSsr: false,
  user: {
    id: null,
    name: '',
    email: '',
    image: '',
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
      };
    case actionTypes.LOGOUT:
      return {
        ...state,
        isLoading: false,
        isLogin: false,
        isSSr: false,
        user: initialState.user,
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
