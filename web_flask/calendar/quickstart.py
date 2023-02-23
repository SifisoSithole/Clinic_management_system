from __future__ import print_function

from datetime import datetime
from flask import request, jsonify
from web_flask.calendar import calendar_app
from models.autho import auth
from models import storage

@calendar_app.route('/')
def get_events():
        """Return all of the events"""
        id = request.cookies.get('id')
        session = auth(id)
        if type(session).__name__ == 'Response':
            return session
        events = list(storage.all('Appointments').values())
        events = [event.to_dict() for event in events]
        for res in events:
            res['date'] = res['date'].strftime("%d-%m-%Y")
            res['start_time'] = res['start_time'].strftime("%H:%M")
            res['end_time'] = res['end_time'].strftime("%H:%M")
        return jsonify(events)
