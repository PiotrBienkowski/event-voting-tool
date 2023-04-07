import hashlib
import time
import secrets
from flask import jsonify
import random

def generate_password():
    random_hash = secrets.token_hex(10)
    return random_hash

def password_hash(password):
    ret = ""
    password = str(password)
    ret = hashlib.sha512(password.encode()).hexdigest()
    return ret

def generate_code():
    tab = []
    for i in range(0, 9):
        tab.append(i)

    for i in [chr(x) for x in range(ord('A'), ord('Z')+1)]:
        tab.append(i)

    tab.remove('I')
    tab.remove(0)
    tab.remove('O')
    tab.remove(1)

    tmp = ""
    for i in range(5):
        tmp += str(tab[random.randint(0, len(tab) - 1)])
    return tmp

def create_database(db):
    db.create_all()

def get_timestamp():
    return int(time.time())

def error_production_mode():
    return "error: production mode"