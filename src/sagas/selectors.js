export default class {
  /**
   * [sagaのselect用のメソッド]
   * [routingのstateを返す]
   * @param  {obj} state [sagaで管理しているstate]
   * @return {obj}       [routingのstateを返す]
   */
  static getRouting(state) {
    return state.routing.locationBeforeTransitions;
  }

  /**
   * [sagaのselect用のメソッド]
   * [topのarchivessのtateを返す]
   * @param  {obj} state [sagaで管理しているstate]
   * @return {obj}       [topのarchivessのtateを返す]
   */
  static getArchives(state) {
    return state.top.archives;
  }

  /**
   * [sagaのselect用のメソッド]
   * [articleのarticleのtateを返す]
   * @param  {obj} state [sagaで管理しているstate]
   * @return {obj}       [articleのarticleのstateを返す]
   */
  static getArticleFromArticle(state) {
    return state.article.article;
  }

  /**
   * [sagaのselect用のメソッド]
   * [articleのarticleのtateを返す]
   * @param  {obj} state [sagaで管理しているstate]
   * @return {obj}       [articleのarticleのstateを返す]
   */
  static getArticleFromEdit(state) {
    return state.edit.article;
  }

  /**
   * [sagaのselect用のメソッド]
   * [articleのcategoryNewのtateを返す]
   * @param  {obj} state [sagaで管理しているstate]
   * @return {obj}       [editのcategoryNewのstateを返す]
   */
  static getNewCetegoryFromEdit(state) {
    return state.edit.categoryNew;
  }

  /**
   * [sagaのselect用のメソッド]
   * [articleのcategoriesのtateを返す]
   * @param  {obj} state [sagaで管理しているstate]
   * @return {obj}       [editのcategoriesのstateを返す]
   */
  static getCategoriesFromEdit(state) {
    return state.edit.categories;
  }

  /**
   * [sagaのselect用のメソッド]
   * [articleのcategoryListsのtateを返す]
   * @param  {obj} state [sagaで管理しているstate]
   * @return {obj}       [editのcategoryListsのstateを返す]
   */
  static getCategoryListsFromEdit(state) {
    return state.edit.categoryLists;
  }

  /**
   * [sagaのselect用のメソッド]
   * [articleのcategoryNewのtateを返す]
   * @param  {obj} state [sagaで管理しているstate]
   * @return {obj}       [editのcategoryNewのstateを返す]
   */
  static getValidFromEdit(state) {
    return state.edit.valid;
  }
}
