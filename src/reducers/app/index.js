import * as actionTypes from '../../actions/actionTypes';


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
        user: initialState.user,
      };
    default:
      return state;
  }
}
