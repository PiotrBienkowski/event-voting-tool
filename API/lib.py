import hashlib
import time
import secrets
from flask import jsonify

def generate_password():
    random_hash = secrets.token_hex(10)
    return random_hash

def password_hash(password):
    ret = ""
    password = str(password)
    ret = hashlib.sha512(password.encode()).hexdigest()
    return ret

def create_database(db):
    db.create_all()

def get_timestamp():
    return int(time.time())

def error_production_mode():
    return "error: production mode"