import lib

def create_pollers(tab, userID, PollerClass, db):
    error = []
    for i in tab:
        if len(i) > 0:
            poller = PollerClass.query.filter_by(code=i).first()
            if poller:
                error.append(i)
            else:
                new_poller = PollerClass(
                    code = i,
                    cnt = 0,
                    userID = userID
                )

                try:
                    db.session.add(new_poller)
                    db.session.commit()
                except Exception as e:
                    db.session.rollback()
                    error.append(i)
    return {
        "error": error
    }
    
def get_all_pollers(userID, PollerClass):
    pollers = PollerClass.query.filter_by(userID=userID).all()
    tab = []
    for poller in pollers:
        tmp = {
            "id": poller.id,
            "cnt": poller.cnt,
            "code": poller.code,
            "timestamp": lib.get_timestamp()
        }
        tab.append(tmp)
    return tab

def auth_code(code, PollerClass):
    poller = PollerClass.query.filter_by(code=code).first()
    if poller:
        return True
    else:
        return False
    
def increase(code, PollerClass, db):
    poller = PollerClass.query.filter_by(code=code).first()
    if poller:
        poller.cnt += 1
        db.session.commit()
        return True
    else:
        return False