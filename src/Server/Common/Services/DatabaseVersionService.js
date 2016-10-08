(function () {
	var Context;
	var classDef = function (serviceContext) {
		Context = serviceContext;
	};
	
	classDef.prototype.GetDatabaseVersions = function (success, error){
		return Context.Handlers.DatabaseVersion.GetDatabaseVersions(success, error);
	};
	
	classDef.prototype.AddDatabaseVersion = function (databaseVersion, success, error){
		return Context.Handlers.DatabaseVersion.AddDatabaseVersion(databaseVersion, success, error);
	};
	
	module.exports = classDef;
})();
