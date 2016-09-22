(function () {
	var classDef = function () {};
	var fs = require('fs');

	classDef.prototype.Handlers = {};
	
    //Setup Clients
	(function() {
		classDef.prototype.Clients = {
			Email: require("./Clients/SendGrid"),
			WorkQueue: require("./Clients/Amqplib")
		};
	})();
    
	//Setup Handlers
	(function() {
        var handlerContext = require("./HandlerContext");
        
        function LoadHandler(handlerName) {
            var handlerDef = require("./DAL/Handlers/" + handlerName);
            return new handlerDef(handlerContext);
        }
		
        //Load Handlers
        var handlers = fs.readdirSync(__dirname + '/DAL/Handlers');

        for (var i = 0; i < handlers.length; i++) {
            classDef.prototype.Handlers[
				handlers[i].replace(/\.js$/, '').replace(/Handler$/, '')
			] = LoadHandler(handlers[i]);
        }
	})();
	
	module.exports = new classDef();
})();
