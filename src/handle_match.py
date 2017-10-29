from match import match
from db import db
import sys

user = sys.stdin.readline().strip()
id = sys.stdin.readline().strip()

d = db()
flist = d.find_match({'_id':str(id)})
if flist.count() != 1:
	#this should never happen
	f = open("/home/AD/quantumato/blacksite.log", "a")
	f.write("No stored value for object ", id, " and user ", user)
for document in flist:
	#if user 1
	if user == document['user_1']:
		if document['status'] == 'pending':
			document['status'] = 'accepted1'
		#document status == accepted2
		else:
			document['status'] = 'accepted'
	elif user == document['user_2']:
		if document['status'] == 'pending':
			document['status'] = 'accepted2'
		else:
			document['status'] = 'accepted'
	#this should never execute
	else:
		f = open("/home/AD/quantumato/blacksite.log", "a")
		f.write("User does not match object ", id, " user: ", user)
