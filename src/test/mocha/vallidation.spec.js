import { expect } from 'chai';
import { validation } from '../../utils';

let text = '';
describe('必須のバリデーション', () => {
  const name = 'カテゴリ';
  it('エラー', () => {
    text = '';
    expect(validation.validEmpty(text, name))
      .to.equal(`${name}は必須です。`);
  });
  it('エラー無', () => {
    text = 'バリュー';
    expect(validation.validEmpty(text, name))
      .to.equal('');
  });
});

describe('タイトルのバリデーション', () => {
  const name = 'カテゴリ';
  it('超過エラー', () => {
    text = 'あいうえおあいうえおあいうえおあいうえおあいうえおあいうえおあいう';
    expect(validation.validTitle(text, name))
      .to.equal('タイトルは32文字以下で設定して下さい。');
  });
  it('必須エラー', () => {
    text = '';
    expect(validation.validTitle(text))
      .to.equal('タイトルは必須です。');
  });
  it('エラー無', () => {
    text = 'タイトル';
    expect(validation.validTitle(text))
      .to.equal('');
  });
});

describe('英数字ハイフン・アンスコのバリデーション', () => {
  const name = 'カテゴリ';
  it('必須エラー', () => {
    text = '';
    expect(validation.validNonJpanese(text, name))
      .to.equal(`${name}は必須です。`);
  });
  it('日本語エラー', () => {
    text = 'ほげ';
    expect(validation.validNonJpanese(text, name))
      .to.equal(`${name}は半角英数字のみです。`);
  });
  it('エラー無', () => {
    text = 'hoge123';
    expect(validation.validNonJpanese(text, name))
      .to.equal('');
  });
  it('エラー無ハイフン', () => {
    text = 'hoge0123';
    expect(validation.validNonJpanese(text, name))
      .to.equal('');
  });
  it('エラー無アンスコ', () => {
    text = 'hoge_123';
    expect(validation.validNonJpanese(text, name))
      .to.equal('');
  });
});

describe('パスワードのバリデーション', () => {
  const name = 'パスワード';
  it('必須エラー', () => {
    text = '';
    expect(validation.validPassword(text))
      .to.equal(`${name}は必須です。`);
  });
  it('文字数エラー', () => {
    text = '7777777';
    expect(validation.validPassword(text))
      .to.equal(`${name}は8文字以上で設定して下さい。`);
  });
  it('エラー無', () => {
    text = '88888888';
    expect(validation.validPassword(text))
      .to.equal('');
  });
});

describe('メールアドレスのバリデーション', () => {
  const name = 'メールアドレス';
  it('必須エラー', () => {
    text = '';
    expect(validation.validEmail(text))
      .to.equal(`${name}は必須です。`);
  });
  it('形式エラー', () => {
    text = 'abcgamil.com';
    expect(validation.validEmail(text))
      .to.equal(`${name}の形式ではありません。`);
  });
  it('形式エラー', () => {
    text = 'abc@gamilcom';
    expect(validation.validEmail(text))
      .to.equal(`${name}の形式ではありません。`);
  });
  it('形式エラー', () => {
    text = '@gamil.com';
    expect(validation.validEmail(text))
      .to.equal(`${name}の形式ではありません。`);
  });
  it('エラー無', () => {
    text = 'abc@gamil.com';
    expect(validation.validEmail(text))
      .to.equal('');
  });
});
