export default class {
  /**
   * 空白チェックのバリデーション
   * @param  {string} text バリデーションを行なう値
   * @param  {string} name バリデーションを行なう項目
   * @return {string} エラーメッセージ
   */
  static validEmpty(text, name) {
    const res = (text === '') ? `${name}は必須です。` : '';
    return res;
  }

  /**
   * タイトル用のバリデーション
   * @param  {string} text バリデーションを行なう値
   * @return {string} エラーメッセージ
   */
  static validTitle(text) {
    const name = 'タイトル';
    let res = this.validEmpty(text, name);
    if (!res) {
      if (text.length > 32) {
        res = `${name}は32文字以内が推奨です。`;
      }
    }
    return res;
  }

  /**
   * 日本語使用禁止のバリデーション
   * @TODO 重複チェック
   * @param  {string} text バリデーションを行なう値
   * @param  {string} name バリデーションを行なう項目
   * @return {string} エラーメッセージ
   */
  static validNonJpanese(text, name) {
    let res = this.validEmpty(text, name);
    if (!res) {
      if (text.match(/[^A-Za-z0-9]+/)) {
        res = `${name}は半角英数字のみです。`;
      }
    }
    return res;
  }
}
