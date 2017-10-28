'''
    class to store match information
'''
#import db
import db
class match:
    #pass in two user ids
    __init__(user_1, user_2):
        uid_1 = user_1
        uid_2 = user_1

    #make a json object for inserting into the db
    make_json():
        return {
            "user_1": uid_1,
            "user_2": uid_2,
            "status": "pending"
        }

    #@param[in] db is a database instance
    insert_match(self, db):
       m = make_json() 
       db.insert_match(m)
