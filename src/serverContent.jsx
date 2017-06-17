import configureStore from './store/configureStore';
import { User } from './api';

export default (props, token) => {
  const router = props.router;
  console.log(router);
  const store = configureStore();
  const state = store.getState();
  (async () => {
    try {
      const user = await User.get('user', token);
      state.app.user = user;
      state.app.isLoading = false;
      state.app.isLogin = true;
    } catch (e) {
      console.log(e);
    }
  })();
  return {
    initialState: state,
  };
};
