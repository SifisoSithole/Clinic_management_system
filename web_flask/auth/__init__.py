#!/usr/bin/python3
""" Blueprint for authentication """

from flask import Blueprint

login_app = Blueprint('signin_app', __name__)
signup_app = Blueprint('signup_app', __name__)
logout_app = Blueprint('logout_app', __name__)

from web_flask.auth.signin import *
from web_flask.auth.signup import *
from web_flask.auth.logout import *
