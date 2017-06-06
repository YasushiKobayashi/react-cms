import { appType } from '../../actionTypes';


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
  console.log(action.type);
  console.log(appType);
  return state;
}
