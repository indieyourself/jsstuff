'use strict'

const MongoClient = require('mongodb').MongoClient;

var mongoDB;

MongoClient.connect("mongodb://192.168.10.87:27017/test", function(err, db) {
	if ( !err) {
		console.log("mongodb connection error");
		return -1;
	};

	mongoDB = db;
});

mongoDB.collection('user').insertOne(
		{ "name": "x-one" },
		function(err, result) {
			console.log(result);
		}
	)
}

