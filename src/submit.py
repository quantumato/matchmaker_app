'''
	This script reads a match from stdin and inserts the match
'''
from db import db
import sys

#read the arguments from stdin
user_1 = sys.stdin.readline().strip()
user_2 = sys.stdin.readline().strip()
match_id = sys.stdin.readline().strip()
comment = sys.stdin.readline().strip()
d = db()
d.insert_match({'user_1': user_1, 'user_2': user_2, 'matcher': match_id, 'status':'pending','comment': comment})
