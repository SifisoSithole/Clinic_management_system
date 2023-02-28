#!/usr/bin/python3
"""Login blueprint"""
from flask import render_template, request, redirect, make_response
from web_flask.auth import login_app
from models import storage
from models.session import Session

@login_app.route('/signin', strict_slashes=False)
@login_app.route('/', strict_slashes=False)
def login():
    """Returns login page"""
    return render_template('signin.html', id=None)


@login_app.route('/signin', methods=['POST'], strict_slashes=False, )
@login_app.route('/', methods=['POST'], strict_slashes=False)
def submit():
    """Validates credantials"""
    users = storage.all('User')
    email = request.form['email'].lower()
    pwd = request.form['password']
    for user in users.values():
        if user.email == email:
            if user.password == pwd:
                session = Session(user_id=user.id)
                storage.new(session)
                session.save()
                my_dict = user.to_dict()
                if user.position == 'Patient':
                    app = storage.all('Appointments').values()
                    resp = make_response(render_template('appointments.html', **my_dict, appointments=app))
                else:
                    resp = make_response(render_template('schedule.html', **my_dict))
                resp.set_cookie('id', session.id)
                for k, v in my_dict.items():
                    if k == 'id':
                        k = 'user_id'
                    if k == 'gender' or k == 'age' or k == 'calendar_id':
                        continue
                    resp.set_cookie(k, v)
                return resp
    return render_template('signin.html', id=4)
