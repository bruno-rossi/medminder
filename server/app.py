#!/usr/bin/env python3

from flask import request, session, make_response
from config import app, db
import os
from models import User

@app.before_request
def load_user():

    if request.method == 'OPTIONS':
        response = make_response({}, 200)
        response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,PATCH,DELETE,OPTIONS')
        return response
    
    # Check access:
    open_access_list = [
        'signup',
        'login',
        'logout',
        'check_session'
    ]

    print(session.get('user_id'))

    # Returns 401 error if the endpoint is not open access and the user is not logged in:
    if (request.endpoint) not in open_access_list and (not session.get('user_id')):
        return {'error': '401 Unauthorized'}, 401

# Sign up
@app.route('/signup/', methods=['POST'], endpoint='signup')
def signup():
    email = request.get_json()['email']
    first_name = request.get_json()['first_name']
    last_name = request.get_json()['last_name']
    password = request.get_json()['password']

    try: 
        if email and password and first_name and last_name:
            new_user = User(email=email, first_name=first_name, last_name=last_name)
            new_user.password_hash = password
    except ValueError as e:
       return {'error': str(e)}, 409
       
    db.session.add(new_user)
    db.session.commit()
        
    return new_user.to_dict(), 201

    # return {'error': '422 Unprocessable Entity'}, 422

# Log in
@app.route('/login/', methods=['POST'], endpoint='login')
def login():

        email = request.get_json()['email']
        password = request.get_json()['password']

        user = User.query.filter(User.email == email).first()

        if user.authenticate(password):

            session['user_id'] = user.id
            return user.to_dict(), 200
        else:
            return {'error': '401 Unauthorized'}, 401

# Log out
@app.route('/logout', methods=['DELETE'], endpoint='logout')
def delete():

        session['user_id'] = None
        session.clear()

        return {}, 204

# Check session
@app.route('/check_session', endpoint='check_session')
def get():

    user_id = session.get('user_id')

    if user_id:
        user = User.query.filter(User.id == session.get('user_id')).first()
        
        return user.to_dict(), 200
    else:
        return {'message': '401: Not Authorized'}, 401