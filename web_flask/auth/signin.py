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
                if user.position == 'Admin':
                    resp = make_response(render_template('admin.html', **my_dict))
                    resp.set_cookie('id', session.id)
                    print(my_dict)
                    for k, v in my_dict.items():
                        if k == 'id':
                            k = 'user_id'
                        if k == 'gender' or k == 'age':
                            continue
                        resp.set_cookie(k, v)
                    return resp
                if user.position == 'Doctor':
                    return redirect('http://localhost:5000/docter/')
                if user.position == 'Patient':
                    return redirect('http://localhost:5000/patient/')
                if user.position == 'Receptionist':
                    return redirect('http://localhost:5000/Receptionist/')
    return render_template('signin.html', id=4)
