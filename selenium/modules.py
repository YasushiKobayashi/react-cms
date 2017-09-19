#!/usr/bin/env python
# -*- coding: utf-8 -*-

import time
import os
import logging

from datetime import datetime
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.ui import Select
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.support.ui import WebDriverWait
from selenium.common.exceptions import NoSuchElementException
from selenium.webdriver.common.desired_capabilities import DesiredCapabilities


SLEEP = 2
now = datetime.now().strftime('%Y%m%d%H%M%S')


def start_firefox():
    driver = webdriver.Firefox()
    driver.set_window_size(1366, 768)
    return driver


def start_chrome():
    d = DesiredCapabilities.CHROME
    d['loggingPrefs'] = {'browser': 'ALL'}
    options = Options()
    options.add_argument('--headless')
    options.add_argument('--disable-gpu')
    driver = webdriver.Chrome(chrome_options=options)
    driver.set_window_size(1366, 768)
    return driver


def print_chrome_console(driver, method):
    log_message = method + ' start log'
    log(log_message, 'console')

    for entry in driver.get_log('browser'):
        log(entry, 'console')

    log_message = method + ' end log'
    log(log_message, 'console')


def log(message, log_name):
    path = os.path
    log_name = 'log/' + log_name + '.log'
    log_file = path.join(path.dirname(path.abspath(__file__)), log_name)
    logging.basicConfig(level=logging.DEBUG, filename=log_file)
    logging.debug(message)


def take_screen_shot(driver, method):
    filename = 'log/' + method + now + '.png'
    path = os.path
    file_path = path.join(path.dirname(path.abspath(__file__)), filename)
    driver.save_screenshot(file_path)


def login_success(driver):
    send_keys_by_id(driver, 'email_signin', 'python@gmail.com')
    send_keys_by_id(driver, 'password_signin', 'pythonpython')
    driver.find_element_by_id('btn_signin').click()
    time.sleep(SLEEP)


def send_keys_by_id(driver, id, val):
    WebDriverWait(driver, 50).until(
        EC.presence_of_element_located((By.ID, id))
    )
    driver.find_element_by_id(id).send_keys(val)
