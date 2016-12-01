(function () {
	var Context;
	var ServiceName;
	var classDef = function (serviceContext, name) {
		Context = serviceContext;
		ServiceName = name;
	};
	
    classDef.prototype.RegisterProcessor = function (key, processor) {
        Context.Clients.WorkQueue.RegisterProcessor(key, processor);
    };
    
	classDef.prototype.QueueMessage = function (exchange, routingKey, content){
		Context.Clients.WorkQueue.QueueMessage(exchange, routingKey, new Buffer(JSON.stringify(content)));
	};
	
	module.exports = classDef;
})();
