from flask import jsonify
import models.BattleModel as BattleModel
import models.UserModel as UserModel

def create_battle(data, BattleClass, UserClass, db):
    email = data.get('email')
    password_hash = data.get('password_hash')
    if UserModel.authUser(email, password_hash, UserClass)["status"]:
        name1 = data.get('name1')
        name2 = data.get('name2')

        if len(name1) == 0 or len(name2) == 0:
            return jsonify({"status": False})
        userId = UserModel.getUserId(email, UserClass)
        return BattleModel.create_battle(name1, name2, userId, BattleClass, db)
    else:
        return jsonify({"status": False}) 
    
def toggle_battle_status(data, BattleClass, UserClass, db):
    email = data.get('email')
    password_hash = data.get('password_hash')
    if UserModel.authUser(email, password_hash, UserClass)["status"]:
        uniqueID = data.get('uniqueID')
        return BattleModel.toggle_battle_status(uniqueID, BattleClass, db)
    else:
        return jsonify({"status": False}) 


def get_all_battles(data, BattleClass, UserClass):
    email = data.get('email')
    password_hash = data.get('password_hash')
    if UserModel.authUser(email, password_hash, UserClass)["status"]:
        userID = UserModel.getUserId(email, UserClass)
        return jsonify({
            "status": True,
            "tab": BattleModel.get_all_battles(userID, BattleClass)
            })
    else:
        return jsonify({"status": False})

