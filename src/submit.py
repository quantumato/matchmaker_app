'''
	This script reads a match from stdin and inserts the match
'''
from match import match
from db import db
import sys

#read the arguments from stdin
user_1 = sys.stdin.readline()
user_2 = sys.stdin.readline()
match_id = sys.stdin.readline()
comment = sys.stdin.readline()
d = db()
d.insert_match({'user_1': user_1, 'user_2': user_2, 'matcher': match_id, 'comment': comment})
