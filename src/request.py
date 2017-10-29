import db as db
import sys

user = sys.stdin.readline().strip()
d = db.db()
#list of documents
ulist = d.find_user_matches(user)
for u in ulist:
	if user == u['user_1'] and (u['status'] == 'accepted2' or u['status'] == 'pending'):
		print(u['user_2'],u['matcher'],u['_id'],u['comment'],sep="\n")
	elif user == u['user_2'] and (u['status'] == 'accepted1' or u['status'] == 'pending'):
		print(u['user_1'],u['matcher'],u['_id'],u['comment'],sep="\n")
