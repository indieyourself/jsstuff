'use strict'

const Kafka = require('no-kafka');
const producer = new Kafka.Producer( {connectionString: 'kafka://192.168.10.87:9092' } );

const message = {
	topic: "test",
	partition: 0,
	message: {
		value: "Hello From NodeJS!"
	}
};

return producer.init().then( function() {
	return producer.send( message, {
		retries: {
			attempts: 2,
			delay: 100
		}
	});
} )
.then( function(result) {
	console.log(result);
});






