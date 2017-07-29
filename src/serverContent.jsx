import configureStore from './store/configureStore';
import { User, Archive, Category } from './api';
import * as constant from './constant';
import { params } from './utils';

export default (async (props, url) => {
  let title = constant.TITLE_LOGIN;
  const store = configureStore();
  const state = store.getState();

  try {
    if (typeof global.token === 'undefined') {
      throw new Error('not login');
    }
    const routes = props.router.routes;
    const routerParams = props.router.routerParams;
    const displayName = routes[1].component.displayName;
    const param = params.getParam(url);
    const query = param ? `?${param}` : '';
    const decodeQuery = params.decode(param);

    // ユーザー関連
    state.app.user = await User.get('user');
    state.app.isLoading = false;
    state.app.isLogin = true;
    state.app.isSsr = true;

    // top
    if (displayName.match(/Top/)) {
      state.top.archives = await Archive.getAllArticle(`post${query}`);
      state.top.count = await Archive.count();
      state.top.categories = await Category.get();
      state.top.pageNumber = decodeQuery.pages;
      state.top.isLoading = false;
      state.top.isSsr = true;
      title = constant.TITLE_TOP;
    }

    // article
    if (displayName.match(/Article/)) {
      const id = routerParams.id;
      const article = await Archive.getSigleArticle(id);
      state.article.article = article;
      state.article.isLoading = false;
      state.article.isSsr = true;
      title = article.title;
    }

    // edit
    if (displayName.match(/Edit/)) {
      // const id = params.id;
      // state.edit.categoryLists = await Category.get();
      // state.edit.article = await Archive.getSigleArticle(id);
      // state.edit.isLoading = false;
      // state.edit.isSsr = true;
      title = constant.TITLE_EDIT;
    }

    // mypage
    if (displayName.match(/Mypage/)) {
      title = constant.TITLE_MYPAGE;
    }

    return {
      initialState: state,
      title,
    };
  } catch (e) {
    console.log(e);
    return {
      initialState: state,
      title,
    };
  }
});
