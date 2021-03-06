#!/usr/bin/env python
# -*- coding: utf-8 -*-

import unittest
import time
import inspect

from modules import start_chrome, start_firefox, send_keys_by_id, login_success, take_screen_shot, print_chrome_console


class TestWebdriver(unittest.TestCase):
    def setUp(self):
        self.URL = 'http://localhost:3000/'
        self.driver = start_chrome()
        self.WEIT = 50
        self.SLEEP = 2

    def tearDown(self):
        self.driver.quit()

    def test1_email_faile(self):
        try:
            method = inspect.currentframe().f_code.co_name
            driver = self.driver
            driver.get(self.URL)
            driver.implicitly_wait(self.WEIT)
            send_keys_by_id(driver, 'name_signup', 'python')
            send_keys_by_id(driver, 'email_signup', 'pythongmail.com')
            send_keys_by_id(driver, 'password_signup', 'pythonpython')
            driver.find_element_by_id('btn_signup').click()
            time.sleep(self.SLEEP)
            take_screen_shot(driver, method)
            print_chrome_console(driver, method)
            token = driver.get_cookie('token')
            self.assertEqual(None, token)
        except Exception as e:
            print(e)
            print_chrome_console(driver, method)
            take_screen_shot(driver, method)
            raise Exception(e)


    def test2_success_regist(self):
        try:
            method = inspect.currentframe().f_code.co_name
            driver = self.driver
            driver.get(self.URL)
            driver.implicitly_wait(self.WEIT)
            send_keys_by_id(driver, 'name_signup', 'python')
            send_keys_by_id(driver, 'email_signup', 'python@gmail.com')
            send_keys_by_id(driver, 'password_signup', 'pythonpython')
            driver.find_element_by_id('btn_signup').click()

            time.sleep(self.SLEEP)
            token = driver.get_cookie('token')
            take_screen_shot(driver, method)
            print_chrome_console(driver, method)
            self.assertNotEqual('', token['value'])
        except Exception as e:
            print(e)
            print_chrome_console(driver, method)
            take_screen_shot(driver, method)
            raise Exception(e)


    def test3_success_login(self):
        try:
            method = inspect.currentframe().f_code.co_name
            driver = self.driver
            driver.get(self.URL)
            driver.implicitly_wait(self.WEIT)
            login_success(driver)
            token = driver.get_cookie('token')
            take_screen_shot(driver, method)
            print_chrome_console(driver, method)
            self.assertNotEqual('', token['value'])
        except Exception as e:
            print(e)
            print_chrome_console(driver, method)
            take_screen_shot(driver, method)
            raise Exception(e)


if __name__ == "__main__":
    unittest.main()
