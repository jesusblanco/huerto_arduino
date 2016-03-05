#!/usr/bin/python
# -*- coding: utf-8 -*-
import os
from flask import Flask
from pymongo import MongoClient
from flask import jsonify

app = Flask(__name__)

mongo_uri = os.environ["MONGODB_DB_URL"]
client = MongoClient(mongo_uri)
db = client.get_default_database()

@app.route('/')
def home_api():
    measures = []
    for m in db.arduino.find({}):
        measures.append({
            'fecha': str(m['date']),
            'temperatura': m['temperatura'],
            'humedad': m['humedad'],
            'h_suelo': m['h_suelo'],
        })

    return jsonify({"measures":measures})

if __name__ == '__main__':
    app.run()
