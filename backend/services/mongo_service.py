from pymongo import MongoClient
from config import MONGO_URI

client = MongoClient(MONGO_URI)

db = client["cv_analyzer"]
collection = db["results"]


def save_cv_result(data):
    result = collection.insert_one(data)
    return str(result.inserted_id)  


def get_all_results():
    results = list(collection.find())

    for r in results:
        r["_id"] = str(r["_id"])   

    return results