export default class {
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
   * @return {obj}       [articleのarticleのtateを返す]
   */
  static getArticle(state) {
    return state.article.article;
  }

  /**
   * [sagaのselect用のメソッド]
   * [routingのstateを返す]
   * @param  {obj} state [sagaで管理しているstate]
   * @return {obj}       [routingのstateを返す]
   */
  static getRouting(state) {
    return state.routing.locationBeforeTransitions;
  }
}
