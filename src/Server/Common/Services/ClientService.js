(function () {
	var Context;
	var classDef = function (serviceContext) {
		Context = serviceContext;
	};
	
	classDef.prototype.GetClients = function (){
		return Context.Handlers.Client.GetClients();
	};
	
	classDef.prototype.AddClient = function (client){
		return Context.Handlers.Client.AddClient(client);
	};
	
	module.exports = classDef;
})();
