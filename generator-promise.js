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
	console.log("+1s: ", result);

	var result = yield delay(3000);
	console.log("+3s: ", result);
}

function run(gen) {
	 gen.next().value.then( 
		() => { 
			gen.next(61);
		}
	);
}

run(mo());

function* mo1() {
	var promise = delay(1000);
	var result = yield promise;
	console.log("+1s result: ", result);
}

function run1(gen) {
	gen.next().value.then(
		() => {
			try{
				console.log("resolve");
				console.log( gen.next(61) );
			} catch(e) {
				console.log(e);
			}
		},
		(reason) => {
			console.log("reject", reason);
		}
	);
}


