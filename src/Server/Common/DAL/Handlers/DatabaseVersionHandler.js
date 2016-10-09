(function () {
	var baseHandler = require('../../BaseHandler')
	var util = require('util');

	var classDef = function (context) {
		baseHandler.apply(this);
		this.Context = context;
	};
	util.inherits(classDef, baseHandler);
	
	classDef.prototype.GetDatabaseVersions = function (){
		return this.Context.DatabaseContext.DatabaseVersions.forge().fetch();
	};
	
	classDef.prototype.AddDatabaseVersion = function(databaseVersion) {
		return this.Context.DatabaseContext.DatabaseVersion.forge().save(databaseVersion);
	};
	
	module.exports = classDef;
})();