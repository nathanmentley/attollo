(function () {
	var Context;
	var classDef = function (serviceContext) {
		Context = serviceContext;
	};
	
	classDef.prototype.GetClients = function (authContext){
		return Context.Handlers.Client.GetClients(authContext);
	};
	
	classDef.prototype.AddClient = function (authContext, name){
		return Context.Handlers.Client.AddClient(authContext, name);
	};
	
	module.exports = classDef;
})();
