(function () {
    var classDef = function () {};
    
	var redis  = require('redis');
    var client = null;

    classDef.prototype.Connect = function () {
        return new Promise((resolve, reject) => {
            client = redis.createClient({
                host: Attollo.Utils.Config.RedisHost,
                port: Attollo.Utils.Config.RedisPort
            });

            resolve(client);
        });
    };
    classDef.prototype.Close = function () {
        client.quit();
    };

	classDef.prototype.Set = function (key, value){
        return client.set(key, value);
	};
    
    classDef.prototype.Get = function (key) {
        return new Promise((resolve, reject) => {
            client.get(key, (err, reply) => {
                resolve(reply);
            });
        });
    }
	
	module.exports = new classDef();
})();
