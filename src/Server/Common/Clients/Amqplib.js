(function () {
    var classDef = function () {};
    
	var amqp  = require('amqplib');
    var amqpConn = null;
    
	classDef.prototype.Connect = function (){
        var self = this;

        return new Promise((resolve, reject) => {
            if(amqpConn == null && Attollo.Utils.Config.RabbitMQUrl != null) {
                amqp.connect(Attollo.Utils.Config.RabbitMQUrl + "?heartbeat=60")
                .then((conn) => {
                    conn.on("error", (err) => {
                        if (err.message !== "Connection closing") {
                            Attollo.Utils.Log.Error("[AMQP] conn error - " + err.message);
                        }
                    });

                    Attollo.Utils.Log.Info("[AMQP] connected");
                    amqpConn = conn;
                    
                    resolve(conn);
                })
                .catch((err) => {
                    Attollo.Utils.Log.Error("[AMQP] " + err.message);
                        
                    reject(err);
                });
            } else {
                Attollo.Utils.Log.Error("[AMQP] already connected.");
            }
        });
	};

	classDef.prototype.Close = function (){
        var self = this;

        if(amqpConn != null) {
            amqpConn.close();
            amqpConn = null;
        } else {
            Attollo.Utils.Log.Error("[AMQP] not connected.");
        }
	};

	module.exports = new classDef();
})();
