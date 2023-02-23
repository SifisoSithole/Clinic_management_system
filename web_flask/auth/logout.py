#!/usr/bin/python3
"""Login blueprint"""
from flask import render_template, request, make_response
from web_flask.auth import logout_app
from models import storage
from models.session import Session
from models.autho import auth

@logout_app.route('/', strict_slashes=False)
def logout():
    """Logs out"""
    id = request.cookies.get('id')
    session = auth(id)
    if type(session).__name__ == 'Response':
        return session
    session.delete()
    resp = make_response(render_template('signin.html', id=None))
    for k, v in request.cookies.items():
        resp.set_cookie(k, v, max_age=0)
    return resp

