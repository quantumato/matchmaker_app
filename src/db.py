import pymongo, json
#from pymongo import MongoClient
client = pymongo.MongoClient()
db = client['test1']
coll = db['test_coll1']
