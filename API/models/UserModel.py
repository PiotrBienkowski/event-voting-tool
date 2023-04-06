import lib

def create_user(name, email, UserClass, db):
    password = lib.generate_password()

    user = UserClass.query.filter_by(email=email).first()
    if user:
        return {
            "status": False, 
            "info": "User with that email already exists.",
            "timestamp": lib.get_timestamp()
        }
    else:
        new_client = UserClass(
            name = name,
            email = email,
            password_hash = lib.password_hash(password)
        )

        try:
            db.session.add(new_client)
            db.session.commit()
            return {
                "status": True, 
                "info": "User created.",
                "password": password,
                "timestamp": lib.get_timestamp()
            }
        except Exception as e:
            db.session.rollback()
            return {
                "status": False,
                "error":  str(e)
            }

def get_all_users(UserClass):
    users = UserClass.query.all()
    tab = []
    for user in users:
        tmp = {
            "user_id": user.id,
            "name": user.name,
            "email": user.email,
            "password_hash": user.password_hash,
            "timestamp": lib.get_timestamp()
        }
        tab.append(tmp)
    return tab

def authUser(email, password_hash, UserClass):
    user = UserClass.query.filter_by(email=email).first()
    if user:
        print(user.password_hash)
        print(password_hash)
        if user.password_hash == password_hash:
            return {
                "status": True,
                "timestamp": lib.get_timestamp()
            }
            
        else:
            return {"status": False, "timestamp": lib.get_timestamp()}
    else:
        return {"status": False, "timestamp": lib.get_timestamp()}