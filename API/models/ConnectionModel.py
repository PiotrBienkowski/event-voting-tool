import lib

def check_poller_voted(pollerCode, battleCode, ConnectionClass):
    poller = ConnectionClass.query.filter_by(pollerCode=pollerCode, battleCode=battleCode).first()
    if poller is not None:
        return True
    else:
        return False

def create_connection(poller_code, battle_code, ConnectionClass, db):
    new_connection = ConnectionClass(
        pollerCode = poller_code,
        battleCode = battle_code
    )

    try:
        db.session.add(new_connection)
        db.session.commit()
        return True
    except Exception as e:
        db.session.rollback()
        return False