#!/usr/bin/python3
"""Login blueprint"""
from flask import render_template, request, redirect, jsonify, abort
from web_flask.accounts import accounts_app
from models import storage
from models.user import User
from models.autho import auth
from models.medical_records import MedicalRecords
from models.appointments import Appointments
from datetime import datetime, date, timedelta
import json

def create_dictionary():
    """Return user information"""
    my_dict = {}
    my_dict['first_name'] = request.cookies.get('first_name')
    my_dict['last_name'] = request.cookies.get('last_name')
    my_dict['position'] = request.cookies.get('position')
    my_dict['id'] = request.cookies.get('user_id')
    return my_dict

@accounts_app.route('/<string:id>', strict_slashes=False)
@accounts_app.route('/schedule', strict_slashes=False)
def admin_index(id=None):
    """Returns page"""
    if id is None:
        id = request.cookies.get('id')
        session = auth(id)
    else:
        session = storage.get('Session', id)
    if type(session).__name__ == 'Response':
        return session
    my_dict = create_dictionary()
    return render_template('schedule.html', **my_dict)

@accounts_app.route('/users', strict_slashes=False)
def get_users():
    """Get all Users"""
    id = request.cookies.get('id')
    position = request.cookies.get('position')
    session = auth(id)
    if type(session).__name__ == 'Response':
        return session
    users = storage.all('User').values()
    my_dict = create_dictionary()
    return render_template('user.html', **my_dict, users=users)

@accounts_app.route('/medical_records', strict_slashes=False)
def get_medicalRecords():
    """Get all medical records"""
    id = request.cookies.get('id')
    position = request.cookies.get('position')
    if position not in ['Admin', 'Doctor', 'Patient']:
        abort(403)
    session = auth(id)
    if type(session).__name__ == 'Response':
        return session
    records = storage.all('MedicalRecords').values()
    my_dict = create_dictionary()
    return render_template('medical_records.html', **my_dict, records=records)

@accounts_app.route('/appointments', strict_slashes=False)
def get_appointments():
    """Get all medical records"""
    id = request.cookies.get('id')
    session = auth(id)
    if type(session).__name__ == 'Response':
        return session
    appointments = list(storage.all('Appointments').values())
    sorted_events = sorted(appointments, key=lambda x: (x.date, x.start_time))
    my_dict = create_dictionary()
    return render_template('appointments.html', **my_dict, appointments=sorted_events)

@accounts_app.route('/register_patient', strict_slashes=False)
def register_patient():
    """Register new patient"""
    id = request.cookies.get('id')
    session = auth(id)
    if type(session).__name__ == 'Response':
        return session
    my_dict = create_dictionary()
    return render_template('register_patient.html', **my_dict)

@accounts_app.route('/add_appointment', methods=['POST'], strict_slashes=False)
def add_appointment():
    """Add new appointment"""
    id = request.cookies.get('id')
    session = auth(id)
    if type(session).__name__ == 'Response':
        return session
    app = Appointments(**request.json)
    app.date = datetime.strptime(app.date, '%d-%m-%Y').date()
    app.start_time = datetime.strptime(app.start_time, '%H:%M')
    app.end_time = app.start_time + timedelta(minutes=30)
    storage.new(app)
    storage.save()
    return jsonify({'result': 'done'})

@accounts_app.route('/add_record', methods=['POST'], strict_slashes=False)
def add_record():
    """Add new record"""
    id = request.cookies.get('id')
    session = auth(id)
    if type(session).__name__ == 'Response':
        return session
    id = request.json['id']
    del request.json['id']
    print('id:', id)
    file = MedicalRecords(**request.json)
    file.date = date.today()
    storage.new(file)
    storage.save()
    appointment = storage.get('Appointments', id)
    appointment.delete()
    return jsonify({'result': 'done'})

@accounts_app.route('/consultations', strict_slashes=False)
def get_consultations():
    """Get all consult"""
    id = request.cookies.get('id')
    session = auth(id)
    if type(session).__name__ == 'Response':
        return session
    appointments = list(storage.all('Appointments').values())
    sorted_events = sorted(appointments, key=lambda x: (x.date, x.start_time))
    my_dict = create_dictionary()
    return render_template('consult.html', **my_dict, appointments=sorted_events)

@accounts_app.route('/get_user/<string:user_id>', strict_slashes=False)
def get_user(user_id):
    """Return user"""
    id = request.cookies.get('id')
    position = request.cookies.get('position')
    session = auth(id)
    userd = storage.get('User', user_id)
    return jsonify(userd.to_dict())

@accounts_app.route('/newUser', strict_slashes=False)
def new_user():
    """Return registration page"""
    id = request.cookies.get('id')
    position = request.cookies.get('position')
    if position != 'Admin':
        return jsonify({'result': "denied"})
    session = auth(id)
    if type(session).__name__ == 'Response':
        return session
    return render_template('add_user.html')


@accounts_app.route('/users', methods=['POST'], strict_slashes=False)
def add_users():
    """Add user"""
    id = request.cookies.get('id')
    position = request.cookies.get('position')
    if position not in ['Admin']:
        return jsonify({'result': "denied"})
    session = auth(id)
    if type(session).__name__ == 'Response':
        return session
    users = storage.all("User")
    email = request.form['email']
    for user in users.values():
        if email == user.email:
            return jsonify({'result': 'exists'})
    else:
        try:
            fName = request.form['first_name']
            lName = request.form['last_name']
            pwd = request.form['password']
            email = request.form['email']
            age = request.form['age']
            gender = request.form['gender']
            position = request.form['position']
            user = User(email=email, first_name=fName, age=age, gender=gender, last_name=lName, password=pwd, position=position)
            storage.new(user)
            user.save()
            return jsonify(user.to_dict())
        except Exception:
            return jsonify({'result': 'failed'})   

@accounts_app.route('/remove/<string:cls>/<string:user_id>', methods=['DELETE'], strict_slashes=False)
def delete_user(cls, user_id):
    """Delete user"""
    id = request.cookies.get('id')
    position = request.cookies.get('position')
    session = auth(id)
    if type(session).__name__ == 'Response':
        return session
    user = storage.get(cls, user_id)
    if user is None:
        return jsonify({'result': "user doesn't exist"})
    user.delete()
    return jsonify({'result': 'deleted'})

@accounts_app.route('/checkin/Appointments/<string:user_id>', methods=['POST'], strict_slashes=False)
def checkin_user(user_id):
    """Checkin user"""
    id = request.cookies.get('id')
    position = request.cookies.get('position')
    if position != 'Receptionist':
        return jsonify({'result': "denied"})
    session = auth(id)
    if type(session).__name__ == 'Response':
        return session
    appointment = storage.get('Appointments', user_id)
    setattr(appointment, 'confirmed', 'true')
    appointment.save()
    print(appointment.to_dict())
    return jsonify({'result': 'done'})