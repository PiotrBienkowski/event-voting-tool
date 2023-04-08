import lib

def create_battle(name1, name2, userId, BattleClass, db):
    uniqueID = lib.generate_password()
    code = lib.generate_code()

    if BattleClass.query.filter_by(code=code).first():
        code = lib.generate_code()
        
    new_battle = BattleClass(
        uniqueID = uniqueID,
        userID = userId,
        name1 = name1,
        name2 = name2,
        code = code,
        votes1 = 0,
        votes2 = 0,
        status = False
    )

    try:
        db.session.add(new_battle)
        db.session.commit()
        return {
            "status": True, 
            "info": "Battle created.",
            "id": uniqueID,
            "timestamp": lib.get_timestamp()
        }
    except Exception as e:
        db.session.rollback()
        return {
            "status": False,
            "error":  str(e)
        }
    
def toggle_battle_status(uniqueID, BattleClass, db):
    battle = BattleClass.query.filter_by(uniqueID=uniqueID).first()
    if battle:
        battle.status = not battle.status
        db.session.commit()
        return {
            "status": True,
        }
    else:
        return {
            "status": False,
        }

def get_all_battles(userID, BattleClass):
    battles = BattleClass.query.filter_by(userID=userID).all()
    tab = []
    for battle in battles:
        tmp = {
            "id": battle.id,
            "name1": battle.name1,
            "name2": battle.name2,
            "uniqueID": battle.uniqueID,
            "code": battle.code,
            "status": battle.status,
            "timestamp": lib.get_timestamp()
        }
        tab.append(tmp)
    return tab

def get_battle(uniqueID, BattleClass):
    battle = BattleClass.query.filter_by(uniqueID=uniqueID).first()
    if battle:
        tmp = {
            "id": battle.id,
            "name1": battle.name1,
            "name2": battle.name2,
            "votes1": battle.votes1,
            "votes2": battle.votes2,
            "uniqueID": battle.uniqueID,
            "code": battle.code,
            "status": battle.status,
            "timestamp": lib.get_timestamp()
        }
        return tmp
    else:
        return False

def get_battle_code(code, BattleClass):
    battle = BattleClass.query.filter_by(code=code).first()
    if battle:
        tmp = {
            "id": battle.id,
            "name1": battle.name1,
            "name2": battle.name2,
            "votes1": battle.votes1,
            "votes2": battle.votes2,
            "uniqueID": battle.uniqueID,
            "code": battle.code,
            "status": battle.status,
            "timestamp": lib.get_timestamp()
        }
        return tmp
    else:
        return False

def check_battle_exist(uniqueID, userID, BattleClass):
    battle = BattleClass.query.filter_by(uniqueID=uniqueID, userID=userID).first()
    if battle is not None:
        return True
    else:
        return False

def increase(player, code, BattleClass, db):
    battle = BattleClass.query.filter_by(code=code).first()
    if battle:
        if player == 1:
            battle.votes1 += 1
        else:
            battle.votes2 += 1
        db.session.commit()
        return True
    else:
        return False