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
		self.database = client['test1']
		self.coll = db['test_coll1']

	def insert_match(self, match):
		#update won't insert if it's a duplicate
		#TODO: handle unique ids manually for 
		self.coll.update_one({"user_1": match['user_1'], "user_2": match['user_2']},
							match,
							upsert=True
							)
	#returns JSON object with results of query
	def find_match(self, query):
		return self.coll.find_one(query)

	#if document exists, delete it and return the document
	def delete_match(self, query):
		return self.coll.find_one_and_delete(query)

    def print_all():
        cursor = coll.find()
        for document in cursor:
            print(document)

	#DANGEROUS SHIT
	def cleardb():
		self.coll.delete_many({})
