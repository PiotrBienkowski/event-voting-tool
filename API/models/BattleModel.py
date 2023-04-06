import lib

def create_battle(name1, name2, userId, BattleClass, db):
    uniqueID = lib.generate_password()

    new_battle = BattleClass(
        uniqueID = uniqueID,
        userID = userId,
        name1 = name1,
        name2 = name2,
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
    
def get_all_battles(userID, BattleClass):
    battles = BattleClass.query.filter_by(userID=userID).all()
    tab = []
    for battle in battles:
        tmp = {
            "id": battle.id,
            "name1": battle.name1,
            "name2": battle.name2,
            "uniqueID": battle.uniqueID,
            "timestamp": lib.get_timestamp()
        }
        tab.append(tmp)
    return tab