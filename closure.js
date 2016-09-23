(function() {
	const greeting = "Hello";
	var name = "stonewf";
	var count = 1;

	function sayHi( ) {
		console.log(`${greeting} ${name} ${count}`);
		++count;
	}

	sayHi();
	sayHi()
}());

/****
	closure: 
		1. less variable escape, less closure burden
		2. class namespace
		3. efficiency!
****/