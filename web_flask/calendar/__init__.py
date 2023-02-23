#!/usr/bin/python3
""" Blueprint for authentication """

from flask import Blueprint

calendar_app = Blueprint('calendar_app', __name__)

from web_flask.calendar.quickstart import *
