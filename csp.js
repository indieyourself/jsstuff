'use strict'
/*
	http://swannodette.github.io/2013/07/12/communicating-sequential-processes
	http://swannodette.github.io/2013/08/24/es6-generators-and-csp
	http://jlongster.com/Taming-the-Asynchronous-Beast-with-CSP-in-JavaScript

	http://lucasmreis.github.io/blog/quick-introduction-to-csp-in-javascript/
	http://lucasmreis.github.io/blog/using-csp-as-application-architecture/

	https://medium.com/javascript-inside/generators-and-channels-in-javascript-594f2cf9c16e#.50facwssy
	https://medium.com/javascript-inside/introduction-into-channels-and-transducers-in-javascript-a1dfd0a09268#.ce311du35
	
*/

const csp = require('js-csp');

csp.go(function* () {
	console.log("hello world");
})

csp.go(function* () {
  yield csp.timeout(1000);
  console.log('something else after 1 second!');
});

console.log('something!');

let ch = csp.chan();

csp.go(function* () {
	var result = yield csp.take(ch);
	console.log("received: ", result);
});

const text = "helloworld!";
console.log("sending: ", text);

// sync or async
csp.putAsync(ch, text);

console.log("sending ends");

console.log("generator comunication");

let chA = csp.chan();
let chB = csp.chan();

csp.go(function* () {
	var result = yield csp.take(chA);
	console.log("A > received: ", result);

	const sending = 'cat';
	console.log('A > sending: ', sending);
	yield csp.put(chB, sending);

	result = yield csp.take(chA);
	console.log("A > received: ", result);
});

csp.go(function* () {
	var sending  =  'dog';
	console.log('B > sending:', sending);
	yield csp.put(chA, sending);

	var result = yield csp.take(chB);
	console.log("B > received: ", result);

	sending  =  'another dog';
	console.log('B > sending:', sending);
	yield csp.put(chA, sending);
});


let chC = csp.chan(csp.buffers.fixed(1));
csp.go(function* () {
  yield csp.put(chC, 'value A');
  console.log('I should print!');
  yield csp.put(chC, 'value B');
  console.log('I should not print!');
});


let droppingCh = csp.chan(csp.buffers.dropping(1));
let slidingCh  = csp.chan(csp.buffers.sliding(1));

csp.go(function* () {
  yield csp.put(droppingCh, 'value A');
  yield csp.put(droppingCh, 'value B');
  yield csp.put(droppingCh, 'value C');
  console.log('DROPPING:', yield csp.take(droppingCh));
});

csp.go(function* () {
  yield csp.put(slidingCh, 'value A');
  yield csp.put(slidingCh, 'value B');
  yield csp.put(slidingCh, 'value C');
  console.log('SLIDING:', yield csp.take(slidingCh));
});
