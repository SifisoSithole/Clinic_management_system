#!/usr/bin/python3
""" Blueprint for admin """

from flask import Blueprint

admin_app = Blueprint('admin_app', __name__)

from web_flask.admin.admin import *
