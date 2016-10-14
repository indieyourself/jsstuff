'use strict'

var ch  = 100;
var promise = new Promise(
		function (resolve, reject) {
			if(true) {
				resolve();
			} else {
				reject();
			}
		}
);

function* genTest() {
	var self = this;
	
	console.log("genTest");

	yield ch;

	console.log("ch value: ", ch);
}

var gen = genTest();

console.log("gen starts running");
console.log( gen.next());

console.log("there is a generator wait!!");
promise.then(
	function() {
		//yield send here!!
		console.log("yield send");
		console.log( gen.next() );
	},

	function(reason) {
		console.log("reject", reason);
	}
);

//console.log(gen.next());
//console.log(gen.next());
//console.log(gen.next().value);
//console.log(gen.next().value);
// chan send here!!



