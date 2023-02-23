#!/usr/bin/python3
"""Login blueprint"""
from flask import render_template, request, redirect, jsonify
from web_flask.admin import admin_app
from models import storage
from models.user import User
from models.autho import auth
from datetime import datetime

def create_dictionary():
    """Return user information"""
    my_dict = {}
    my_dict['first_name'] = request.cookies.get('first_name')
    my_dict['last_name'] = request.cookies.get('last_name')
    my_dict['position'] = request.cookies.get('position')
    return my_dict

@admin_app.route('/<string:id>', strict_slashes=False)
@admin_app.route('/schedule', strict_slashes=False)
def admin_index(id=None):
    """Returns admin page"""
    if id is None:
        id = request.cookies.get('id')
        session = auth(id)
    else:
        session = storage.get('Session', id)
    if type(session).__name__ == 'Response':
        return session
    my_dict = create_dictionary()
    return render_template('admin.html', **my_dict)

@admin_app.route('/users', strict_slashes=False)
def get_users():
    """Get all Users"""
    id = request.cookies.get('id')
    session = auth(id)
    if type(session).__name__ == 'Response':
        return session
    users = storage.all('User').values()
    my_dict = create_dictionary()
    return render_template('user.html', **my_dict, users=users)

@admin_app.route('/medical_records', strict_slashes=False)
def get_medicalRecords():
    """Get all medical records"""
    id = request.cookies.get('id')
    session = auth(id)
    if type(session).__name__ == 'Response':
        return session
    records = storage.all('MedicalRecords').values()
    my_dict = create_dictionary()
    return render_template('medical_records.html', **my_dict, records=records)

@admin_app.route('/appointments', strict_slashes=False)
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

@admin_app.route('/newUser', strict_slashes=False)
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


@admin_app.route('/users', methods=['POST'], strict_slashes=False)
def add_users():
    """Add user"""
    id = request.cookies.get('id')
    position = request.cookies.get('position')
    if position != 'Admin':
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
            position = request.form['position']
            user = User(email=email, first_name=fName, last_name=lName, password=pwd, position=position)
            storage.new(user)
            user.save()
            return jsonify(user.to_dict())
        except Exception:
            return jsonify({'result': 'failed'})   

@admin_app.route('/remove/<string:cls>/<string:user_id>', methods=['DELETE'], strict_slashes=False)
def delete_user(cls, user_id):
    """Delete user"""
    id = request.cookies.get('id')
    position = request.cookies.get('position')
    if position != 'Admin':
        return jsonify({'result': "denied"})
    session = auth(id)
    if type(session).__name__ == 'Response':
        return session
    user = storage.get(cls, user_id)
    if user is None:
        return jsonify({'result': "user doesn't exist"})
    user.delete()
    return jsonify({'result': 'deleted'})