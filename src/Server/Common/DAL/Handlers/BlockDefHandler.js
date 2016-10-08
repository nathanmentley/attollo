(function () {
	var baseHandler = require('../../BaseHandler')
	var util = require('util');

	var classDef = function (context) {
		baseHandler.apply(this);
		this.Context = context;
	};
	util.inherits(classDef, baseHandler);
	
	classDef.prototype.GetBlockDefs = function (success, error){
		return this.Context.DatabaseContext.BlockDefs.forge().fetch()
				.then(success).catch(error);
	};
	
	classDef.prototype.AddBlockDef = function(blockDef, success, error) {
		return this.Context.DatabaseContext.BlockDef.forge().save(blockDef)
				.then(success).catch(error);
	};
	
	module.exports = classDef;
})();