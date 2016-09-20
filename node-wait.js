'use strict'

const net = require('net');

console.log("node wait test");

function Producer( options ) {
	this.options = options;

	// Connection
	this.socket = new net.Socket();

}

Producer.prototype.init = function() {
	this.socket.on('end', function () {
                console.log('Kafka server has closed connection');
        });

	this.socket.connect( this.options.port, this.options.host , function() {
		console.log("connected");
	});
}

const producer = new Producer( { host: '192.168.10.87', port: 9092 } );

// WILL WAIT IN EPOLL
producer.init();

