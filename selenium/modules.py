# -*- coding: utf-8 -*-

import time
import os

from datetime import datetime

from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import Select
from selenium.common.exceptions import NoSuchElementException

SLEEP = 2
now = datetime.now().strftime('%Y%m%d%H%M%S')


def start_firefox():
    driver = webdriver.Firefox()
    driver.set_window_size(1366, 768)
    return driver


def start_chrome():
    driver = webdriver.Chrome()
    driver.set_window_size(1366, 768)
    return driver


def take_screen_shot(driver, filename):
    filename = 'img/' + filename + now + '.png'
    path = os.path
    file_path = path.join(path.dirname(path.abspath(__file__)), filename)
    driver.save_screenshot(file_path)


def login_success(driver):
    send_keys_by_id(driver, 'email_signin', 'python@gmail.com')
    send_keys_by_id(driver, 'password_signin', 'pythonpython')
    driver.find_element_by_id('btn_signin').click()
    time.sleep(SLEEP)


def send_keys_by_id(driver, id, val):
    driver.find_element_by_id(id).send_keys(val)
