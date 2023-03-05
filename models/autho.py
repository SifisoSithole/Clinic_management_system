from models import storage
from flask import render_template, make_response, request
from datetime import datetime, timedelta

def result(id):
    """Authorise user"""
    session = storage.get('Session', id)
    if session is None:
        return None
    new_dt = datetime.utcnow()
    diff = new_dt - session.updated_at
    minutes = diff.total_seconds() / 60
    if minutes < 30:
        setattr(session, 'updated_at', datetime.utcnow())
        session.save()
        storage.reload()
        return session
    session.delete()
    return "expired"

def auth(id):
    """Authorise user"""
    session = result(id)
    if session is None:
        return make_response(render_template('signin.html', id=5))
    elif session == 'expired':
        return make_response(render_template('signin.html', id=6))
    return session
