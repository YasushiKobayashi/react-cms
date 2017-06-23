# -*- coding: utf-8 -*-

import time

from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import Select
from selenium.common.exceptions import NoSuchElementException

SLEEP = 2


def start_firefox():
    driver = webdriver.Firefox()
    return driver


def start_chrome():
    driver = webdriver.Chrome()
    return driver


def take_screen_shot(driver):
    driver.save_screenshot()


def login_success(driver):
    send_keys_by_id(driver, 'email_signin', 'python@gmail.com')
    send_keys_by_id(driver, 'password_signin', 'pythonpython')
    driver.find_element_by_id('btn_signin').click()
    time.sleep(SLEEP)


def send_keys_by_id(driver, id, val):
    driver.find_element_by_id(id).send_keys(val)
