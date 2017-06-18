export default class {
  /**
   * [sagaのselect用のメソッド]
   * [userのsstateを返す]
   * @param  {obj} state [sagaで管理しているstate]
   * @return {obj}       [userのstateを返す]
   */
  static getUser(state) {
    return state.app.user;
  }

  /**
   * [sagaのselect用のメソッド]
   * [appのsstateを返す]
   * @param  {obj} state [sagaで管理しているstate]
   * @return {obj}       [appのstateを返す]
   */
  static getFromApp(state) {
    return state.app;
  }

  /**
   * [sagaのselect用のメソッド]
   * [topのarchivessのstateを返す]
   * @param  {obj} state [sagaで管理しているstate]
   * @return {obj}       [topのarchivessのstateを返す]
   */
  static getArchivesFromTop(state) {
    return state.top.archives;
  }

  /**
   * [sagaのselect用のメソッド]
   * [topのarchivessのstateを返す]
   * @param  {obj} state [sagaで管理しているstate]
   * @return {obj}       [topのarchivessのstateを返す]
   */
  static getStateFromTop(state) {
    return state.top;
  }

  /**
   * [sagaのselect用のメソッド]
   * [articleのarticleのstateを返す]
   * @param  {obj} state [sagaで管理しているstate]
   * @return {obj}       [articleのarticleのsstateを返す]
   */
  static getArticleFromArticle(state) {
    return state.article.article;
  }

  /**
   * [sagaのselect用のメソッド]
   * [articleのstateを返す]
   * @param  {obj} state [sagaで管理しているstate]
   * @return {obj}       [articleのsstateを返す]
   */
  static getFromArticle(state) {
    return state.article;
  }

  /**
   * [sagaのselect用のメソッド]
   * [editのarticleのstateを返す]
   * @param  {obj} state [sagaで管理しているstate]
   * @return {obj}       [editのarticleのsstateを返す]
   */
  static getArticleFromEdit(state) {
    return state.edit.article;
  }

  /**
   * [sagaのselect用のメソッド]
   * [articleのcategoryNewのstateを返す]
   * @param  {obj} state [sagaで管理しているstate]
   * @return {obj}       [editのcategoryNewのsstateを返す]
   */
  static getNewCetegoryFromEdit(state) {
    return state.edit.categoryNew;
  }

  /**
   * [sagaのselect用のメソッド]
   * [articleのcategoriesのstateを返す]
   * @param  {obj} state [sagaで管理しているstate]
   * @return {obj}       [editのcategoriesのsstateを返す]
   */
  static getCategoriesFromEdit(state) {
    return state.edit.categories;
  }

  /**
   * [sagaのselect用のメソッド]
   * [articleのcategoryListsのstateを返す]
   * @param  {obj} state [sagaで管理しているstate]
   * @return {obj}       [editのcategoryListsのsstateを返す]
   */
  static getCategoryListsFromEdit(state) {
    return state.edit.categoryLists;
  }

  /**
   * [sagaのselect用のメソッド]
   * [articleのcategoryNewのstateを返す]
   * @param  {obj} state [sagaで管理しているstate]
   * @return {obj}       [editのcategoryNewのsstateを返す]
   */
  static getValidFromEdit(state) {
    return state.edit.valid;
  }
}
