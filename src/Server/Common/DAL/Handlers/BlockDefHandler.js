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
	
	classDef.prototype.AddBlockDef = function(authContext, blockDef) {
		return this.Context.DatabaseContext.BlockDef.forge().save(blockDef);
	};
	
	module.exports = classDef;
})();