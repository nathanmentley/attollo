(function () {
	var Context;
	var classDef = function (serviceContext) {
		Context = serviceContext;
	};
	
	classDef.prototype.GetClients = function (success, error){
		return Context.Handlers.Client.GetClients(success, error);
	};
	
	classDef.prototype.AddClient = function (client, success, error){
		return Context.Handlers.Client.AddClient(client, success, error);
	};
	
	module.exports = classDef;
})();
