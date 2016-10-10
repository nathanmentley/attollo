(function () {
	var baseHandler = require('../../BaseHandler')
	var util = require('util');

	var classDef = function (context) {
		baseHandler.apply(this);
		this.Context = context;
	};
	util.inherits(classDef, baseHandler);
	
	classDef.prototype.GetSites = function (authContext){
		return this.Context.DatabaseContext.Sites(authContext).fetch();
	};
	
	module.exports = classDef;
})();