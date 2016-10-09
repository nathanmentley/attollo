(function () {
	var baseHandler = require('../../BaseHandler')
	var util = require('util');

	var classDef = function (context) {
		baseHandler.apply(this);
		this.Context = context;
	};
	util.inherits(classDef, baseHandler);
	
	classDef.prototype.GetDatabaseVersions = function (authContext){
		return this.Context.DatabaseContext.DatabaseVersions().fetch();
	};
	
	classDef.prototype.AddDatabaseVersion = function(authContext, databaseVersion) {
		return this.Context.DatabaseContext.DatabaseVersion.forge().save(databaseVersion);
	};
	
	module.exports = classDef;
})();