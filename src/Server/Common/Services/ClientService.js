(function () {
	var Context;
	var ServiceName;
	var classDef = function (serviceContext, name) {
		Context = serviceContext;
		ServiceName = name;
	};
	
	classDef.prototype.GetClients = function (authContext){
		return Context.Handlers.Client.GetClients(authContext);
	};
	
	classDef.prototype.AddClient = function (authContext, name){
		return Context.DBTransaction((transaction) => {
            Context.Handlers.Client.AddClient(authContext, transaction, name)
			.then((result) => {
				transaction.commit(result);
			}).catch((err) => {
				transaction.rollback(err);
			});
		});
	};
	
	module.exports = classDef;
})();
