'use strict'

function delay( ms ) {
	var promise = new Promise(
		function (resolve, reject) {
			setTimeout(resolve, ms);
		}
	);
	return promise;
}

function* mo() {
	var result = yield delay(1000);
	console.log("+1s: ", result+1);

	var result = yield delay(3000);
	console.log("+3s: ", result+3);

	var result = yield delay(6000);
	console.log("+6s: ", result+6);
}

/*
	NEED ALL Kinds Of Run and Helper
*/

function run(genClass) {
	var genInstance = genClass(); 
	runHelper.call(genInstance);
}

function runHelper( ) {
	var self = this; 
	var result = self.next(60);
	if (result.done) { return; };
	
	var promise = result.value;
	promise.then(function() {
		runHelper.call(self);
	});
}

run(

	mo

);


