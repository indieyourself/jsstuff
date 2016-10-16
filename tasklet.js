'use strict'



function* sleep( resume ) {
	for(var i = 0; i < 10; ++i) {
		console.log("hi~");
		var result = yield setTimeout( function() { resume(100); }, 1000 );

		console.log( "result: ", result);
		console.log("counter: ", i);	
	}
}


function Tasklet() {
}



function run( promise ) {
	var gen = tasklet.gen(promise.resolve);
	function resume(result) {
		gen.next(result);
	}
	gen.next();
}
