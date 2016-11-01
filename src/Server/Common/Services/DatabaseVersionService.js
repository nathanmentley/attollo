(function () {
	var Context;
	var classDef = function (serviceContext) {
		Context = serviceContext;
	};
	
	classDef.prototype.GetDatabaseVersions = function (authContext){
		return Context.Handlers.DatabaseVersion.GetDatabaseVersions(authContext);
	};
	
	classDef.prototype.AddDatabaseVersion = function (authContext, databaseVersion){
		return Context.Handlers.DatabaseVersion.AddDatabaseVersion(authContext, databaseVersion);
	};
	
	classDef.prototype.GetDatabaseCodeVersions = function (authContext){
		return Context.Handlers.DatabaseVersion.GetDatabaseCodeVersions(authContext);
	};
	
	classDef.prototype.AddDatabaseCodeVersion = function (authContext, databaseCodeVersion){
		return Context.Handlers.DatabaseVersion.AddDatabaseCodeVersion(authContext, databaseCodeVersion);
	};
	
	module.exports = classDef;
})();
