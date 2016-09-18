'use strict'

const Kafka = require('no-kafka');
const consumer = new Kafka.SimpleConsumer( {connectionString: 'kafka://192.168.10.87:9092' } );

const dataHandler = function(messageSet, topic, partition) {
	messageSet.forEach( function(m) {
		console.log( topic, partition, m.offset, m.message.value.toString('utf8') );
	} );
}

return consumer.init().then( function() {
	return consumer.subscribe( 'test', [0], dataHandler);
} )

