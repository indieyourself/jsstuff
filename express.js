'use strict'
const express = require('express');
const app = express()

app.get('/', function(req, res) {
	res.send('Hello world!');
});

const server = app.listen(3000, function() {
	const host = server.address().address;
	const port = server.address().port;

	console.log(`server listening http://${host}:${port}`);
})
