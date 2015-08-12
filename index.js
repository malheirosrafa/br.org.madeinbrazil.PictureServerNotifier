#!/usr/bin/env node

/*
 * Codigo-fonte retirado de https://www.rabbitmq.com/tutorials/tutorial-three-javascript.html
 * com algumas adaptacoes
 */

//Recebe o id da imagem e da um purge no servidor de imagem

var amqp = require('amqplib/callback_api');

amqp.connect('amqp://mqadmin:EmbelezApp2015@queue.embelezapp.com.br', function(err, conn) {
  conn.createChannel(function(err, ch) {
    
    var ex = 'exchange';

    ch.assertExchange(ex, 'fanout', {durable: false});
    
    ch.assertQueue('', {exclusive: true}, function(err, q) {
        console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", q.queue);
	ch.bindQueue(q.queue, ex, '');

    	ch.consume(q.queue, function(msg) {
        
		console.log(" [x] Received %s", msg.content.toString());
   
	        var http = require('http')
 
	        var options = {
	    	    host: '104.131.106.29',
	  	    port: 80,
	  	    path: '/'+msg.content.toString()+'/normal.jpg',
	  	    method: 'PURGE'
	        };
	
 	  	var req = http.request(options, function(res) {
   	            console.log('STATUS: ' + res.statusCode);
		    console.log('HEADERS: ' + JSON.stringify(res.headers));
		    res.setEncoding('utf8');
		    res.on('data', function (chunk) {
		   	 console.log('BODY: ' + chunk);
  	            });
                });

        	req.on('error', function(e) {
	    	    console.log('problem with request: ' + e.message);
        	});

        	//write data to request body
        	req.write('data\n');
        	req.write('data\n');
        	req.end();
   
        }, {noAck: true});
     });
  });
});
