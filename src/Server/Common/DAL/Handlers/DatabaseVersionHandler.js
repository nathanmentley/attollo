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
	
	module.exports = classDef;
})();