import { expect } from 'chai';

import { validation } from '../../src/utils';

let text = '';
describe('必須のバリデーション', () => {
  const name = 'カテゴリ';
  it('異常：エラー', () => {
    text = '';
    expect(validation.validEmpty(text, name))
      .to.equal(`${name}は必須です。`);
  });
  it('正常：エラーなし', () => {
    text = 'バリュー';
    expect(validation.validEmpty(text, name))
      .to.equal('');
  });
});

describe('タイトルのバリデーション', () => {
  const name = 'カテゴリ';
  it('異常：超過エラー', () => {
    text = 'あいうえおあいうえおあいうえおあいうえおあいうえおあいうえおあいう';
    expect(validation.validTitle(text, name))
      .to.equal('タイトルは32文字以下で設定して下さい。');
  });
  it('異常：必須エラー', () => {
    text = '';
    expect(validation.validTitle(text))
      .to.equal('タイトルは必須です。');
  });
  it('正常：エラーなし', () => {
    text = 'タイトル';
    expect(validation.validTitle(text))
      .to.equal('');
  });
});

describe('英数字ハイフン・アンスコのバリデーション', () => {
  const name = 'カテゴリ';
  it('異常：必須エラー', () => {
    text = '';
    expect(validation.validNonJpanese(text, name))
      .to.equal(`${name}は必須です。`);
  });
  it('異常：日本語エラー', () => {
    text = 'ほげ';
    expect(validation.validNonJpanese(text, name))
      .to.equal(`${name}は半角英数字のみです。`);
  });
  it('正常：エラーなし', () => {
    text = 'hoge123';
    expect(validation.validNonJpanese(text, name))
      .to.equal('');
  });
  it('正常：エラーなしハイフン', () => {
    text = 'hoge0123';
    expect(validation.validNonJpanese(text, name))
      .to.equal('');
  });
  it('正常：エラーなしアンスコ', () => {
    text = 'hoge_123';
    expect(validation.validNonJpanese(text, name))
      .to.equal('');
  });
});

describe('パスワードのバリデーション', () => {
  const name = 'パスワード';
  it('異常：必須エラー', () => {
    text = '';
    expect(validation.validPassword(text))
      .to.equal(`${name}は必須です。`);
  });
  it('異常：文字数エラー', () => {
    text = '7777777';
    expect(validation.validPassword(text))
      .to.equal(`${name}は8文字以上で設定して下さい。`);
  });
  it('正常：エラーなし', () => {
    text = '88888888';
    expect(validation.validPassword(text))
      .to.equal('');
  });
});

describe('メールアドレスのバリデーション', () => {
  const name = 'メールアドレス';
  it('異常：必須エラー', () => {
    text = '';
    expect(validation.validEmail(text))
      .to.equal(`${name}は必須です。`);
  });
  it('異常：形式エラー', () => {
    text = 'abcgamil.com';
    expect(validation.validEmail(text))
      .to.equal(`${name}の形式ではありません。`);
  });
  it('異常：形式エラー', () => {
    text = 'abc@gamilcom';
    expect(validation.validEmail(text))
      .to.equal(`${name}の形式ではありません。`);
  });
  it('異常：形式エラー', () => {
    text = '@gamil.com';
    expect(validation.validEmail(text))
      .to.equal(`${name}の形式ではありません。`);
  });
  it('正常：エラーなし', () => {
    text = 'abc@gamil.com';
    expect(validation.validEmail(text))
      .to.equal('');
  });
});
