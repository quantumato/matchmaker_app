from db import db

d = db()
m1 = {"user_1":"1234", "user_2":"5678", "status": "pending"}
d.insert_match(m1)
print("inserting match 1")

d.insert_match({"user_1":"1123", "user_2":"5813", "status": "pending"})
print("inserting match 2")

d.print_all()

print("update first match")
m1["status"] = "success"
d.insert_match(m1)
d.print_all()

d.cleardb()
print("should print an empty database after this line")
d.print_all()
