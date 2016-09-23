(function() {
	const greeting = "Hello";
	var name = "stonewf";

	function sayHi( ) {
		console.log(`${greeting} ${name}`);
	}

	sayHi();
}());

/****
	closure: 
		1. less variable escape, less closure burden
		2. class namespace
		3. efficiency!
****/