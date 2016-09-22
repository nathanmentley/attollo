(function () {
	var Context;
	var classDef = function (serviceContext) {
		Context = serviceContext;
	};
	
    classDef.prototype.RegisterProcessor = function (key, processor) {
        Context.Clients.WorkQueue.RegisterProcessor(key, processor);
    };
    
    classDef.prototype.Start = function () {
        Context.Clients.WorkQueue.StartRabbit();
    };
    
	classDef.prototype.QueueMessage = function (exchange, routingKey, content){
		Context.Clients.WorkQueue.QueueMessage(exchange, routingKey, new Buffer(JSON.stringify(content)));
	};
	
	module.exports = classDef;
})();
