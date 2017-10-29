from db import db
import random
from match import match

#test basic insertion and updating
def test1():
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

def gen_match(uid1, uid2, matcher):
	return match(str(uid1), str(uid2), str(matcher))
	
#test retrieval of all matches
def test2():
	d = db()
	m1 = gen_match(random.randint(00000, 99999), random.randint(00000, 99999), random.randint(00000, 99999))
	print(m1)
	d.insert_match(m1)
	m2 = gen_match('1234', random.randint(00000, 99999), random.randint(00000, 99999))
	d.insert_match(m2)
	m3 = gen_match(random.randint(00000, 99999), '1234', random.randint(00000, 99999))
	d.insert_match(m3)
	m4 = gen_match(random.randint(00000, 99999), random.randint(00000, 99999), '1234')
	d.insert_match(m4)
	m5 = gen_match(random.randint(00000, 99999), random.randint(00000, 99999), random.randint(00000, 99999))
	d.insert_match(m5)
	m6 = gen_match(random.randint(00000, 99999), random.randint(00000, 99999), random.randint(00000, 99999))
	d.insert_match(m6)

	d.print_all()
	print("now search for user 1234's matches")

	ulist = d.find_user_matches('1234')
	for u in ulist:
		print(u)
	d.cleardb()
test2()
