'use strict'

// http://stackoverflow.com/questions/27647742/promise-resolve-then-vs-setimmediate-vs-nexttick

var promise = new Promise(
	function (resolve, reject) {
		if(true) {
			console.log("inner resolve");
			resolve();
		} else {
			reject();
		}
	}
);

setTimeout(
	function() {
		promise.then(
			function() {
				console.log("resolve");
			},

			function(reason) {
				console.log("reject", reason);
			}
		)
	},

	1000
);

Promise.resolve(233).then(
	function(v) {
		console.log("v: ", v);
	}
);


Promise.resolve(promise).then(
	function() {
		console.log("after promise ");
		throw new TypeError("Throwing");
	},

	function(e) {
		console.log(e);
	}
).then(
	function() {
		console.log("nothing here");
	},

	function(e) {
		console.log("next ", e);
	}
)

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

def test(result):
	raise Exception('test')

d.addCallback(test)
swallow exception


***/





