(function () {
	var baseHandler = require('../../BaseHandler')
	var util = require('util');

	var classDef = function (context) {
		baseHandler.apply(this);
		this.Context = context;
	};
	util.inherits(classDef, baseHandler);
	
	classDef.prototype.GetDatabaseVersions = function (authContext){
		return this.Context.DatabaseContext.DatabaseVersions(authContext).fetch();
	};
	
	classDef.prototype.AddDatabaseVersion = function (authContext, transaction, model){
		var DatabaseVersion = this.Context.DatabaseContext.DatabaseVersion(authContext);
		var databaseVersion = new DatabaseVersion(model);

		return databaseVersion.save(null, null, null, { transacting: transaction });
	};
	
	classDef.prototype.GetDatabaseCodeVersions = function (authContext){
		return this.Context.DatabaseContext.DatabaseCodeVersions(authContext).fetch();
	};
	
	classDef.prototype.AddDatabaseCodeVersion = function (authContext, transaction, model){
		var DatabaseCodeVersion = this.Context.DatabaseContext.DatabaseCodeVersion(authContext);
		var databaseCodeVersion = new DatabaseCodeVersion(model);

		return databaseCodeVersion.save(null, null, null, { transacting: transaction });
	};
	
	module.exports = classDef;
})();