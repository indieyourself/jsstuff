'use strict'

var promise = new Promise(
	function (resolve, reject) {
		if(true) {
			console.log("inner resolve");
			resolve();
		} else {
			console.log("inner reject");
			reject();
		}
	}
);

function resolve() {
	console.log("callback will raise an execption");

	throw new  Error("Throwing");
}

function resolve2() {
	console.log("resolve2");
}
function reject2( e ) {
	console.log("reject2: ", e);
}

function reject( e ) {
	console.log(e);
}

//promise.then( resolve, reject ).then(resolve, reject);

promise.then( resolve, reject ).then(resolve2, reject2).catch( reject);
promise.then( resolve, reject ).then(resolve2).catch( reject);
