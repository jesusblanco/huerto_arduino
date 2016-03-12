#!/usr/bin/python
# -*- coding: utf-8 -*-
import os
from flask import Flask
from flask import render_template
from pymongo import MongoClient
from flask import jsonify

app = Flask(__name__)

mongo_uri = os.environ["MONGODB_DB_URL"]
client = MongoClient(mongo_uri)
db = client.get_default_database()

@app.route('/data')
def home_api():
    measures = []
    for m in db.arduino.find({}):
        measures.append({
            'fecha': m['date'].strftime("%Y-%m-%d %H:%M:%S"),
            'temperatura': float(m['temperatura']),
            'humedad': float(m['humedad']),
            'h_suelo': float(m['h_suelo']),
        })

    return jsonify({"measures":measures})

@app.route('/')
def home():
    return render_template('index.html')


if __name__ == '__main__':
    app.run()
