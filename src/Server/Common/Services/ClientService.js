(function () {
	var Context;
	var classDef = function (serviceContext) {
		Context = serviceContext;
	};
	
	classDef.prototype.GetClients = function (authContext){
		return Context.Handlers.Client.GetClients(authContext);
	};
	
	module.exports = classDef;
})();
