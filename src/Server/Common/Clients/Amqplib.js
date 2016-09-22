(function () {
    var classDef = function () {};
    
	var amqp  = require('amqplib/callback_api');
    var amqpConn = null;
    
    var pubChannel = null;
    var offlinePubQueue = [];
    
    var processorFunctions = {};
    
    function closeOnErr(err) {
        if (!err)
            return false;
            
        Attollo.Utils.Log.Error("[AMQP] error" + err);
        amqpConn.close();
        
        return true;
    };
    
    function setupConnection() {
        //publisher
        (function() {
            amqpConn.createConfirmChannel(function(err, ch) {
                if (closeOnErr(err))
                    return;
                   
                ch.on("error", function(err) {
                    Attollo.Utils.Log.Error("[AMQP] channel error" + err.message);
                });
            
                ch.on("close", function() {
                    Attollo.Utils.Log.Info("[AMQP] channel closed");
                });

                pubChannel = ch;
                while (true) {
                    var m = offlinePubQueue.shift();
                    if (!m) break;
                    classDef.prototype.QueueMessage(m[0], m[1], m[2]);
                }
            });
        })();
        
        //consumer
        (function () {
            
            if(Object.keys(processorFunctions).length !== 0){
                // A worker that acks messages only if processed successfully
                amqpConn.createChannel(function(err, ch) {
                    if (closeOnErr(err))
                        return;
                        
                    ch.on("error", function(err) {
                        Attollo.Utils.Log.Error("[AMQP] channel error" + err.message);
                    });
                    ch.on("close", function() {
                        Attollo.Utils.Log.Info("[AMQP] channel closed");
                    });
                    
                    ch.prefetch(10);
                    
                    for(var i = 0; i < Object.keys(processorFunctions).length; i++){
                        if(typeof processorFunctions[Object.keys(processorFunctions)[i]] === 'function') {
                            var queueKey = Object.keys(processorFunctions)[i];
                            
                            ch.assertQueue(queueKey, { durable: true }, function(err, _ok) {
                                if (closeOnErr(err))
                                    return;
                                    
                                ch.consume(queueKey, function (msg) { processMsg(msg, queueKey); }, { noAck: false });
                                
                                Attollo.Utils.Log.Info(queueKey + " worker is started");
                            });
                        }
                    }
                    
                    function processMsg(msg, key) {
                        processorFunctions[key](msg, function(ok) {
                            try {
                                if (ok)
                                    ch.ack(msg);
                                else
                                    ch.reject(msg, true);
                            } catch (e) {
                                closeOnErr(e);
                            }
                        });
                    }
                });
            }
        })();
    };

	classDef.prototype.StartRabbit = function (){
        var self = this;

        if(amqpConn == null && Attollo.Utils.Config.RabbitMQUrl != null) {
            amqp.connect(Attollo.Utils.Config.RabbitMQUrl + "?heartbeat=60", function(err, conn) {
                if (err) {
                    Attollo.Utils.Log.Error("[AMQP] " + err.message);
                }
                conn.on("error", function(err) {
                    if (err.message !== "Connection closing") {
                        Attollo.Utils.Log.Error("[AMQP] conn error - " + err.message);
                    }
                });
            
                conn.on("close", function() {
                    amqpConn = null;
                    Attollo.Utils.Log.Error("[AMQP] reconnecting");
                    return setTimeout(function() { self.StartRabbit(); }, 1000);
                });
            
                Attollo.Utils.Log.Info("[AMQP] connected");
                
                amqpConn = conn;
                
                setupConnection();
            });
        } else {
            Attollo.Utils.Log.Error("[AMQP] already connected.");
        }
	};

	classDef.prototype.QueueMessage = function (exchange, routingKey, content){
        try {    
            pubChannel.publish(exchange, routingKey, content, { persistent: true },
                function(err, ok) {
                    if (err) {
                        Attollo.Utils.Log.Error("[AMQP] publish" + err);
                        
                        offlinePubQueue.push([exchange, routingKey, content]);
                        pubChannel.connection.close();
                    }
                }
            );
        } catch (e) {                                                                                                                               
            Attollo.Utils.Log.Error("[AMQP] publish" + e.message);
            
            offlinePubQueue.push([exchange, routingKey, content]);
        }
	};
    
    classDef.prototype.RegisterProcessor = function (routingKey, processor) {
        Attollo.Utils.Log.Info(routingKey + " worker is loaded");
                        
        processorFunctions[routingKey] = processor;
    }
	
	module.exports = new classDef();
})();
