(function () {
	var Context;
	var classDef = function (serviceContext) {
		Context = serviceContext;
	};
	
	classDef.prototype.GetDatabaseVersions = function (authContext){
		return Context.Handlers.DatabaseVersion.GetDatabaseVersions(authContext);
	};
	
	classDef.prototype.AddDatabaseVersion = function (authContext, databaseVersion){
		return Context.DBTransaction((transaction) => {
			Context.Handlers.DatabaseVersion.AddDatabaseVersion(authContext, transaction, databaseVersion)
			.then((result) => {
				transaction.commit(result);
			}).catch((err) => {
				transaction.rollback(err);
			});
		});
	};
	
	classDef.prototype.GetDatabaseCodeVersions = function (authContext){
		return Context.Handlers.DatabaseVersion.GetDatabaseCodeVersions(authContext);
	};
	
	classDef.prototype.AddDatabaseCodeVersion = function (authContext, databaseCodeVersion){
		return Context.DBTransaction((transaction) => {
			Context.Handlers.DatabaseVersion.AddDatabaseCodeVersion(authContext, transaction, databaseCodeVersion)
			.then((result) => {
				transaction.commit(result);
			}).catch((err) => {
				transaction.rollback(err);
			});
		});
	};
	
	module.exports = classDef;
})();
