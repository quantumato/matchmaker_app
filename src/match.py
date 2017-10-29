'''
	class to store match information
'''
#import db
import db, datetime
class match:
	#pass in two user ids
	def __init__(self, user_1, user_2, matcher):
		self.uid_1 = user_1
		self.uid_2 = user_2
		self.matcher_uid = matcher
		self.date_time = datetime.datetime.now()

	#make a json object for inserting into the db
	def make_json(self):
		return {
			"user_1": self.uid_1,
			"user_2": self.uid_2,
			"matcher": self.matcher_uid,
			"date_time": self.date_time,
			"status": "pending"
		}

	def get_uid_1(self):
		return self.uid_1

	def get_uid_2(self):
		return self.uid_2
