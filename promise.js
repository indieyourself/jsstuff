'use strict'

var promise = new Promise(
	function (resolve, reject) {
		if(true) {
			resolve();
		} else {
			reject();
		}
	}
);

promise.then(
	function() {
		console.log("resolve");
	},

	function(reason) {
		console.log("reject", reason);
	}
);

/***
Twisted Defer

from twisted.internet import defer
d = defer.Deferred()

result = "HelloWorld!!"
failure = "FailWorld!!"
d.callback(result)               => resolve
d.errback(failure)		=> reject

d.addCallback()
d.addErrback()



***/