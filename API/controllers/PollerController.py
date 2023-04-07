from flask import jsonify
import models.PollerModel as PollerModel
import models.UserModel as UserModel

def create_pollers(data, PollerClass, UserClass, db):
    email = data.get('email')
    password_hash = data.get('password_hash')
    if UserModel.authUser(email, password_hash, UserClass)["status"]:
        userId = UserModel.getUserId(email, UserClass)
        codes = data.get("codes")
        tab = str(codes).split(";")
        return jsonify(PollerModel.create_pollers(tab, userId, PollerClass, db))
    else:
        return jsonify({"status": False}) 

def get_all_pollers(data, PollerClass, UserClass):
    email = data.get('email')
    password_hash = data.get('password_hash')
    if UserModel.authUser(email, password_hash, UserClass)["status"]:
        userID = UserModel.getUserId(email, UserClass)
        return jsonify({
            "status": True,
            "tab": PollerModel.get_all_pollers(userID, PollerClass)
            })
    else:
        return jsonify({"status": False})
    
def auth_code(data, PollerClass, db):
    code = data.get('code')
    if len(code) == 0:
        return jsonify({"status": False})
    
    if PollerModel.auth_code(code, PollerClass):
        return jsonify({"status": True})
    else:
        return jsonify({"status": False})
