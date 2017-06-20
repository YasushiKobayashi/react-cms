import { expect } from 'chai';
import { By } from 'selenium-webdriver';

import * as selenum from './selenum';


const baseUrl = 'http://localhost:7000/';

describe('新規登録', () => {
  it('正常：新規登録', () => {
    const driver = selenum.startPhantomDriver(baseUrl);
    selenum.takeScreenshot(driver, '正常：新規登録');
    driver.findElement(By.id('name_signin')).clear();
    driver.findElement(By.id('name_signin')).sendKeys('ptpadan@gmail.com');
    driver.findElement(By.id('email_signin')).clear();
    driver.findElement(By.id('email_signin')).sendKeys('ptpadan@gmail.com');
    driver.findElement(By.id('password_signin')).clear();
    driver.findElement(By.id('password_signin')).sendKeys('ptpadan@gmail.com');
    driver.findElement(By.id('btn_signin')).click();
    driver.getCurrentUrl().then((url) => {
      expect(url)
        .to.equal(`${baseUrl}/jphe`);
    });

    driver.quit();
  });
});
