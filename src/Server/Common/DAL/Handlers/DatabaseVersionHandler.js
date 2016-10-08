(function () {
	var baseHandler = require('../../BaseHandler')
	var util = require('util');

	var classDef = function (context) {
		baseHandler.apply(this);
		this.Context = context;
	};
	util.inherits(classDef, baseHandler);
	
	classDef.prototype.GetDatabaseVersions = function (success, error){
		return this.Context.DatabaseContext.DatabaseVersions.forge().fetch()
				.then(success).catch(error);
	};
	
	classDef.prototype.AddDatabaseVersion = function(databaseVersion, success, error) {
		return this.Context.DatabaseContext.DatabaseVersion.forge().save(databaseVersion)
				.then(success).catch(error);
	};
	
	module.exports = classDef;
})();