from flask import jsonify
import models.UserModel as UserModel

def create_user(name, email, UserClass, db):
    # TODO: validate name and email
    return jsonify(UserModel.create_user(name, email, UserClass, db))

def all_users(UserClass):
    users_json = jsonify(UserModel.get_all_users(UserClass))
    return users_json

def login(data, UserClass):
    email = data.get('email')
    password_hash = data.get('password_hash')
    return jsonify(UserModel.authUser(email, password_hash, UserClass))