#!/usr/bin/env python
# -*- coding: utf-8 -*-

import unittest
import time

from modules import start_chrome, send_keys_by_id, login_success


class TestWebdriver(unittest.TestCase):
    def setUp(self):
        self.URL = 'http://localhost:3000/'
        self.driver = start_chrome()
        self.WEIT = 30
        self.SLEEP = 2

    def test_新規登録失敗（アドレス不正）(self):
        try:
            driver = self.driver
            driver.get(self.URL)
            driver.implicitly_wait(self.WEIT)
            send_keys_by_id(driver, 'name_signup', 'python')
            send_keys_by_id(driver, 'email_signup', 'pythongmail.com')
            send_keys_by_id(driver, 'password_signup', 'pythonpython')
            driver.find_element_by_id('btn_signup').click()
            time.sleep(self.SLEEP)
            token = driver.get_cookie('token')
            self.assertEqual(None, token)
        except Exception as e:
            print(e)
            raise Exception(e)
        finally:
            driver.quit()

    def test_新規登録成功(self):
        try:
            driver = self.driver
            driver.get(self.URL)
            driver.implicitly_wait(self.WEIT)
            send_keys_by_id(driver, 'name_signup', 'python')
            send_keys_by_id(driver, 'email_signup', 'python@gmail.com')
            send_keys_by_id(driver, 'password_signup', 'pythonpython')
            driver.find_element_by_id('btn_signup').click()
            time.sleep(self.SLEEP)
            token = driver.get_cookie('token')
            self.assertNotEqual('', token['value'])
        except Exception as e:
            print(e)
            raise Exception(e)
        finally:
            driver.quit()

    def test_ログイン成功(self):
        try:
            driver = self.driver
            driver.get(self.URL)
            driver.implicitly_wait(self.WEIT)
            login_success(driver)
            token = driver.get_cookie('token')
            self.assertNotEqual('', token['value'])
        except Exception as e:
            print(e)
            raise Exception(e)
        finally:
            driver.quit()


if __name__ == "__main__":
    unittest.main()
