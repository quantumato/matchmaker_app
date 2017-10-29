from match import match
from db import db
import sys
from bson.objectid import ObjectId

oid = sys.stdin.readline().strip()
user = sys.stdin.readline().strip()
mode = sys.stdin.readline().strip()


d = db()
document = d.find_match({'_id':ObjectId(oid)})
d.print_all()
#:w
#document = d.find_match({'_id':str(oid)})
#if flist.count() != 1:
#this should never happen
#	f = open("/home/AD/quantumato/blacksite.log", "a")
#f.write("No stored value for object ", id, " and user ", user)
if document == None:
	print("result not found")
elif mode == 'rejected':
	document['status'] = 'rejected'
	d.insert_match(document)
#if user 1
elif user == document['user_1']:
	if document['status'] == 'pending':
		document['status'] = 'accepted1'
		d.insert_match(document)
	#document status == accepted2
	else:
		document['status'] = 'accepted'
		d.insert_match(document)
elif user == document['user_2']:
	if document['status'] == 'pending':
		document['status'] = 'accepted2'
		d.insert_match(document)
	else:
		document['status'] = 'accepted'
		d.insert_match(document)
#this should never execute
else:
	f = open("/home/AD/quantumato/blacksite.log", "a")
	f.write("User does not match object ", oid, " user: ", user)
