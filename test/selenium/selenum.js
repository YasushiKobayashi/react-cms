import webdriver from 'selenium-webdriver';
import fs from 'fs';
import moment from 'moment';

const now = moment().format('YYMMDDHHmm');

export const startPhantomDriver = (url) => {
  const driver = new webdriver.Builder()
    .withCapabilities(webdriver.Capabilities.phantomjs())
    .build();
  driver.manage().window().setSize(1200, 980);
  driver.get(url);
  return driver;
};

export const startFirefoxDriver = (url) => {
  const driver = new webdriver.Builder()
    .forBrowser('firefox')
    .build();
  driver.manage().window().setSize(1200, 980);
  driver.get(url);
  return driver;
};

export const takeScreenshot = (driver, testCase) => {
  driver.takeScreenshot().then((base64Image) => {
    const decodedImage = new Buffer(base64Image, 'base64');
    fs.writeFile(`./img/${testCase}_${now}.jpg`, decodedImage);
  });
};
