import validator from 'validator';

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
   * メールアドレスのバリデーション
   * @param  {string} text バリデーションを行なう値
   * @return {string} エラーメッセージ
   */
  static validEmail(text) {
    const name = 'メールアドレス';
    let res = this.validEmpty(text, name);
    if (!res) {
      if (!validator.isEmail(text)) {
        res = `${name}の形式ではありません。`;
      }
    }
    return res;
  }

  /**
   * パスワードのバリデーション
   * @param  {string} text バリデーションを行なう値
   * @return {string} エラーメッセージ
   */
  static validPassword(text) {
    const name = 'パスワード';
    let res = this.validEmpty(text, name);
    if (!res) {
      if (text.length < 8) {
        res = `${name}は8文字以上で設定して下さい。`;
      }
    }
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
   * 半角英数字ハイフン、アンスコのみ許容するバリデーション
   * @TODO 重複チェック
   * @param  {string} text バリデーションを行なう値
   * @param  {string} name バリデーションを行なう項目
   * @return {string} エラーメッセージ
   */
  static validNonJpanese(text, name) {
    let res = this.validEmpty(text, name);
    if (!res) {
      if (text.match(/[^a-zA-Z0-9-_]+/)) {
        res = `${name}は半角英数字のみです。`;
      }
    }
    return res;
  }
}
