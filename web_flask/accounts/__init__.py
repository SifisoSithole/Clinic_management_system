#!/usr/bin/python3
""" Blueprint for accounts """

from flask import Blueprint

accounts_app = Blueprint('accounts_app', __name__)

from web_flask.accounts.account import *
