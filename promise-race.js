'use strict'

var p1 = new Promise(function(resolve, reject) {
	setTimeout(reject, 5000, "one");
});

var p2 = new Promise(function(resolve, reject) {
	setTimeout(resolve, 20000, "two");
});


Promise.race([p1, p2]).then(
	function(value) {
		console.log(value);
	},

	function(reason) {
		console.log("error ", reason);
	}
);

/******
  DEAL WITH TIMEOUT.

  after 5s:
  	error one
  then after 15:
  	process.exit(0) // p2 was eaten by the process.
******/
