(function () {
	var Context;
	var classDef = function (serviceContext) {
		Context = serviceContext;
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
