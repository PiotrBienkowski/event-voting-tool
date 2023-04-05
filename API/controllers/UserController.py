from flask import Flask, jsonify, request, render_template
import models.UserModel as UserModel

def create_user(name, email, UserClass, db):
    # TODO: validate name and email
    return jsonify(UserModel.create_user(name, email, UserClass, db))

def all_users(UserClass):
    users_json = jsonify(UserModel.get_all_users(UserClass))
    return users_json