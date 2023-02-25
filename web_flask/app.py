#!/usr/bin/python3
"""Flask Application"""

from web_flask.auth import login_app
from models import storage
from models.autho import auth
from web_flask.auth import signup_app
from web_flask.auth import logout_app
from web_flask.accounts import accounts_app
from web_flask.calendar import calendar_app
from datetime import datetime
from flask import Flask, make_response, jsonify, request

app = Flask(__name__)
app.register_blueprint(login_app, url_prefix='/')
app.register_blueprint(logout_app, url_prefix='/logout')
app.register_blueprint(signup_app, url_prefix='/signup')
app.register_blueprint(accounts_app, url_prefix='/accounts')
app.register_blueprint(calendar_app, url_prefix='/events')

@app.route('/search/<string:cls>/<string:str>', methods=['GET'], strict_slashes=False)
def search(cls, str):
    """Search strings"""
    id = request.cookies.get('id')
    position = request.cookies.get('position')
    if position not in ['Admin', 'Doctor', 'Receptionist']:
        return jsonify({'result': "denied"})
    session = auth(id)
    if cls == 'MedicalRecords1':
        filter = 0
        cls = 'MedicalRecords'
    else:
        filter = 1
    if type(session).__name__ == 'Response':
        return session
    result = storage.search(cls, str)
    result = [obj.to_dict() for obj in result]
    if cls == 'Appointments':
        result = sorted(result, key=lambda x: (x["date"], x["start_time"]))
        for res in result:
            res['date'] = res['date'].strftime("%d-%m-%Y")
            res['start_time'] = res['start_time'].strftime("%H:%M")
            res['end_time'] = res['end_time'].strftime("%H:%M")
    if position == 'Doctor' and filter:
        new_result = []
        user_id = request.cookies.get('user_id')
        for res in result:
            if res['doctor_id'] == user_id:
                new_result.append(res)
        result = new_result
    return jsonify(result)

@app.route('/search/record/<string:record_id>', strict_slashes=False)
def search_record(record_id):
    """Search fo record"""
    id = request.cookies.get('id')
    position = request.cookies.get('position')
    if position not in ['Admin', 'Doctor']:
        return jsonify({'result': "denied"})
    session = auth(id)
    if type(session).__name__ == 'Response':
        return session
    obj = storage.get('MedicalRecords', record_id)
    return jsonify(obj.to_dict())




@app.errorhandler(404)
def not_found(error):
    """404 Error"""
    return make_response(jsonify({'error': "Not found"}), 404)

if __name__ == "__main__":
    app.run(host='0.0.0.0', port='5000', threaded=True)
