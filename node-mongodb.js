'use strict'

const MongoClient = require('mongodb').MongoClient;

var mongoDB;
var mongoDBPromise;

MongoClient.connect("mongodb://192.168.10.87:27017/test", function(err, db) {
	if ( err !== null ) {
		console.log("mongodb connection error");
		process.exit(-1);
	};

	mongoDB = db;

	mongoDB.collection('user').insertOne(
		{ "name": "x-one" },
		function(err, result) {
			console.log(result);
		}
	);
});

function connect( url ) {
	var promise = new Promise(
		function(resolve, reject) {
			MongoClient.connect(url, function(err, db) {
				if ( err !== null ) {
					reject();
				} else {
					resolve(db);
				}
			});
		});
	return promise;
}

connect( "mongodb://192.168.10.87:27017/test" ).then(
	function(db) {
		console.log("promise mongodb connect success");

		mongoDBPromise = db;

		mongoDBPromise.collection('user').insertOne(
			{ "name": "x-one" },
			function(err, result) {
				console.log(result);
			}
		);
	},
	
	function(reason) {
		console.log("promise mongodb connect error", reason);
	}
)

