(function () {
	var baseHandler = require('../../BaseHandler')
	var util = require('util');

	var classDef = function (context) {
		baseHandler.apply(this);
		this.Context = context;
	};
	util.inherits(classDef, baseHandler);
	
	classDef.prototype.GetBlockDefs = function (authContext){
		return this.Context.DatabaseContext.BlockDefs(authContext).fetch();
	};
	
	module.exports = classDef;
})();