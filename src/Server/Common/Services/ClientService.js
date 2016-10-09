(function () {
	var Context;
	var classDef = function (serviceContext) {
		Context = serviceContext;
	};
	
	classDef.prototype.GetClients = function (authContext){
		return Context.Handlers.Client.GetClients(authContext);
	};
	
	classDef.prototype.AddClient = function (authContext, client){
		return Context.Handlers.Client.AddClient(authContext, client);
	};
	
	module.exports = classDef;
})();
