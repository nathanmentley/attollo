(function () {
	var Context;
	var classDef = function (serviceContext) {
		Context = serviceContext;
	};
	
	classDef.prototype.GetDatabaseVersions = function (){
		return Context.Handlers.DatabaseVersion.GetDatabaseVersions();
	};
	
	classDef.prototype.AddDatabaseVersion = function (databaseVersion){
		return Context.Handlers.DatabaseVersion.AddDatabaseVersion(databaseVersion);
	};
	
	module.exports = classDef;
})();
