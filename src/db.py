import pymongo, json
#from pymongo import MongoClient
client = pymongo.MongoClient()
#db = client['test1']
#coll = db['test_coll1']
#cursor = coll.find()
#for document in cursor:
#	print(document)

class db:
	def __init__(self):
		self.client = pymongo.MongoClient()
		self.database = self.client['test1']
		self.match_coll = self.database['matches']
		self.user_coll = self.database['users']

	def insert_match(self, match):
		#update won't insert if it's a duplicate
		#TODO: handle unique ids manually for 
		self.match_coll.update_one({"user_1": match["user_1"], "user_2": match["user_2"]},
							{"$set": match},
							upsert=True
							)
	#returns JSON object with results of query
	def find_match(self, query):
		return self.match_coll.find_one(query)

	#search for matches containing that user
	def find_user_matches(self, user):
		cursor = self.match_coll.find({'$or': [{'user_1': user}, {'user_2':user}]})
		retval = []
		for document in cursor:
		   #grab the other user from every document in the query 
			if document['user_1'] == user:
				retval.append(document)
			else:
				retval.append(document)
		return retval

	#if document exists, delete it and return the document
	def delete_match(self, query):
		return self.match_coll.find_one_and_delete(query)

	def print_all(self):
		cursor = self.match_coll.find()
		for document in cursor:
			print(document)

	#DANGEROUS SHIT
	def cleardb(self):
		self.match_coll.delete_many({})
