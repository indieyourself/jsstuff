'use strict'
// https://modernweb.com/2014/02/10/replacing-callbacks-with-es6-generators/

function run( ) {
	var gen = sleep(resume);
	function resume(result) {
		gen.next(result);
	}
	gen.next();
}

function* sleep( resume ) {
	for(var i = 0; i < 10; ++i) {
		console.log("hi~");
		var result = yield setTimeout( function() { resume(100); }, 1000 );

		console.log( "result: ", result);
		console.log("counter: ", i);	
	}
}


run();


