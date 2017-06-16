import showdown from 'showdown';
import toMarkdown from 'to-markdown';

export default class {
  /**
   * [マークダウンのコンテンツをHTMLに変換する]
   * @param  {string} val [マークダウン]
   * @return {string}     [HTML]
   */
  static toHtml(val) {
    const converter = new showdown.Converter({
      simplifiedAutoLink: true,
      tables: true,
      tasklists: true,
      requireSpaceBeforeHeadingText: true,
    });
    return converter.makeHtml(val);
  }

  /**
   * [htmlをマークダウンに変換する]
   * @param  {string} val [HTML]
   * @return {string}     [マークダウン]
   */
  static toMarkdown(val) {
    return toMarkdown(val);
  }

  /**
   * [指定の位置に文字列を追加する]
   * @param  {string} str    [元の文字列]
   * @param  {int}    index  [指定の位置]
   * @param  {string} insert [追加したい文字列]
   * @return {string}        [追加後の文字列]
   */
  static insertStr(str, index, insert) {
    return str.slice(0, index) + insert + str.slice(index, str.length);
  }
}
