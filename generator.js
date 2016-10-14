
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


/* Didn't Work!!
function idMaker() {
	var index = 0;
	while (true) {
		yield index++;
	}
}

function* genClass( callback ) {
	callback();
}

var genInstnce = genClass( idMaker );

console.log('======genClass:idMaker======');
console.log( genInstnce.next().value );
console.log( genInstnce.next().value );
console.log( genInstnce.next().value );
console.log( genInstnce.next().value );
console.log( genInstnce.next().value );
console.log( genInstnce.next().value );
console.log( genInstnce.next().value );
*/

/*
	tasklet => function*
*/

function one() {
	return 1;
}

function two() {
	return 2;
}

function* numMaker( callback ) {
	while(true) {
		yield callback();
	}
}

var oneGen = numMaker(one);
var twoGen = numMaker(two);
/*
	scheduler
*/
function scheduler() {
	console.log('======scheduler======');
	console.log( oneGen.next().value );
	console.log( twoGen.next().value );
	console.log( oneGen.next().value );
	console.log( twoGen.next().value );
	console.log( oneGen.next().value );
	console.log( twoGen.next().value );
}

scheduler();
