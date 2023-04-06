# to run
# export FLASK_APP=app.py
# flask run

import lib

from flask import Flask, jsonify, request, render_template, make_response
from flask.helpers import send_file
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_restful import Api, Resource

import controllers.UserController as UserController

app = Flask(__name__)
CORS(app)
api = Api(app)

DEBUG = True

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
db = SQLAlchemy(app)

app.run(host='10.166.48.146', port=5000)

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), nullable=False)
    password_hash = db.Column(db.String(100), nullable=False)

@app.route('/', methods=['GET'])
def main():
    return "Status: ok"

@app.route('/create-db', methods=['GET'])
def create_db():
    if DEBUG:
        lib.create_database(db)
        return "database created"
    else:
        return lib.error_production_mode()
    
@app.route('/create-user')
def create_client():
    # TODO: create form
    if DEBUG:
        name = "test"
        email = "3@3.3"
        # password: 40b8d16effce4e07f559
        return UserController.create_user(name, email, User, db)
    else:
        return lib.error_production_mode()

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    return UserController.login(data, User)

@app.route('/all-users')
def all_users():
    if DEBUG:
        return UserController.all_users(User)
    else:
        return lib.error_production_mode()
    
@app.route('/hash', methods=['GET'])
def getHash():
    # TODO: Change it because sending the password to the API is not secure
    text = request.args.get("text")
    return {"hash": lib.password_hash(text)}