from flask import jsonify
import models.BattleModel as BattleModel
import models.UserModel as UserModel
import models.ConnectionModel as ConnectionModel
import models.PollerModel as PollerModel

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

def battle_info(data, BattleClass, UserClass, db):
    email = data.get('email')
    password_hash = data.get('password_hash')
    uniqueID = data.get('uniqueID')
    if UserModel.authUser(email, password_hash, UserClass)["status"] and len(uniqueID) > 0:
        userID = UserModel.getUserId(email, UserClass)
        if BattleModel.check_battle_exist(uniqueID, userID, BattleClass):
            return jsonify({
                "status": True,
                "battle": BattleModel.get_battle(uniqueID, BattleClass)
            })
        else:
            return jsonify({"status": False})
    else:
        return jsonify({"status": False})

def battle_login(data, BattleClass, ConnectionClass, PollerClass):
    poller_code = data.get('pollerCode')
    battle_code = data.get('battleCode')
    tmp = BattleModel.get_battle_code(battle_code, BattleClass)
    if PollerModel.auth_code(poller_code, PollerClass) == False:
        return jsonify({
            "status": False,
            "message": "pnf",
        })

    if tmp != False:
        if tmp["status"]:
            if ConnectionModel.check_poller_voted(poller_code, battle_code, ConnectionClass) == False:
                tmp["uniqueID"] = "--"
                tmp["votes1"] = "--"
                tmp["votes2"] = "--"
                tmp["id"] = "--"
                return jsonify({
                    "status": True,
                    "info": tmp,
                })
            else:
                return jsonify({
                    "status": False,
                    "message": "Juz oddałeś głos w tej bitwie",
                })
        else:
            return jsonify({
                "status": False,
                "message": "Bitwa nie zbiera głosów",
            })
    else:
        return jsonify({
            "status": False,
            "message": "Podana bitwa nie istnieje",
        })
    
def battle_login_check(data, BattleClass, ConnectionClass, PollerClass):
    poller_code = data.get('pollerCode')
    battle_code = data.get('battleCode')
    tmp = BattleModel.get_battle_code(battle_code, BattleClass)
    if PollerModel.auth_code(poller_code, PollerClass) == False:
        return False

    if tmp != False:
        if tmp["status"]:
            if ConnectionModel.check_poller_voted(poller_code, battle_code, ConnectionClass) == False:
                return (True, "Dziękujemy za oddanie głosu")
            else:
                return (False, "Juz oddałeś głos w tej bitwie")
        else:
            return (False, "Bitwa nie zbiera głosów")
    else:
        return (False, "Błąd")

def battle_vote(data, BattleClass, ConnectionClass, PollerClass, db):
    player = data.get("player")
    poller_code = data.get('pollerCode')
    battle_code = data.get('battleCode')
    if player == 1 or player == 2:
        tmp = battle_login_check(data, BattleClass, ConnectionClass, PollerClass)
        
        if tmp[0]:
            ret = BattleModel.increase(player, battle_code, BattleClass, db)
            if ret:
                if ConnectionModel.create_connection(poller_code, battle_code, ConnectionClass, db):
                    PollerModel.increase(poller_code, PollerClass, db)
                    return jsonify({
                        "status": True,
                        "message": tmp[1],
                    })
                else:
                    return jsonify({
                        "status": False,
                        "message": tmp[1],
                    })
            else:
                return jsonify({
                    "status": False,
                    "message": tmp[1],
                })
        else:
            return jsonify({
                "status": False,
                "message": tmp[1],
            })
    else:
        return jsonify({
            "status": False,
            "message": "Błąd",
        })