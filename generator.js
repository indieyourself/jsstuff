
//Generator Class

function* idMaker() {
	var index = 0;
	while (true) {
		yield index++;
	}
}

var gen = idMaker();

console.log('======idMaker======');
console.log( gen.next().value );
console.log( gen.next().value );
console.log( gen.next().value );
console.log( gen.next().value );
console.log( gen.next().value );
console.log( gen.next().value );
console.log( gen.next().value );


function* fib() {
	var fn1 = 0;
	var fn2 = 1;
	
	//throw new Error("oooo");

	while(true) {
		var currenct= fn1;
		fn1 = fn2;
		fn2 = currenct + fn2;
		
		try{
			var reset = yield currenct;	
		} catch(e) {
			console.log(e);
		}

		
		if (reset) {
			fn1 = 0;
			fn2 = 1;
		};
	}
}


var gen = fib();

console.log('======fib======');
console.log( gen.next().value );
console.log( gen.next().value );
console.log( gen.next().value );
console.log( gen.next().value );
console.log( gen.next().value );
console.log( gen.next(true).value );
console.log( gen.next().value );

//try{
	gen.throw(new Error("test"));	
//} catch(e) {

//}

console.log( gen.next().value );
console.log( gen.next().value );
