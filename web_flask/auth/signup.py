#!/usr/bin/python3
"""Login blueprint"""
from flask import render_template, request, Response, jsonify
from web_flask.auth import signup_app
from models.user import User
from models import storage
import requests

@signup_app.route('/', strict_slashes=False)
def signup():
    """Returns sign up page"""
    return render_template('signup.html')

@signup_app.route('/script/<int:ids>', strict_slashes=False)
def script(ids=None):
    """Return appropriate response"""
    if ids == 1:
        resp = Response(
            """
            alert("Account created successful, Please log in");
            """, mimetype="application/javascript"
        )
    elif ids == 2:
        resp = Response(
            """
            alert("Failed to create account, please try again");
            """, mimetype="application/javascript"
        )
    elif ids == 3:
        resp = Response(
            """
            alert("Account already exists, Please log in");
            """, mimetype="application/javascript"
        )
    elif ids == 4:
        resp = Response(
            """
            alert("Incorrect user name or password");
            """, mimetype="application/javascript"
        )
    elif ids == 5:
        resp = Response(
            """
            alert("Access denied, please sign in");
            """, mimetype="application/javascript"
        )
    elif ids == 6:
        resp = Response(
            """
            window.location.replace("http://localhost:5000/")
            alert("Session expired, please sign in again");
            """, mimetype="application/javascript"
        )
    else:
        resp = Response(
            """
            """, mimetype="application/javascript"
        )

    return resp


@signup_app.route('/', methods=['POST'], strict_slashes=False)
def create_acc():
    """Returns sign up page"""
    users = storage.all("User")
    position = request.cookies.get('position')
    email = request.form['email']
    for user in users.values():
        if email == user.email:
            if position == 'Receptionist':
                return jsonify({'result': 'exists'})
            ids = 3
            break
    else:
        try:
            fName = request.form['first_name']
            lName = request.form['last_name']
            pwd = request.form['password']    
            age = request.form['age']    
            gender = request.form['gender']    
            user = User(email=email, first_name=fName, last_name=lName, password=pwd, age=age, gender=gender, position='Patient')
            storage.new(user)
            storage.save()
            storage.reload()
            ids = 1
            if position == 'Receptionist':
                return jsonify({'result': 'created'})
        except Exception:
            ids = 2
            if position == 'Recptionist':
                return jsonify({'result': 'failed'})
            render_template('signup.html', id=ids)
    return render_template('signin.html', id=ids)
