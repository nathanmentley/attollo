(function () {
	var baseHandler = require('../../BaseHandler')
	var util = require('util');

	var classDef = function (context) {
		baseHandler.apply(this);
		this.Context = context;
	};
	util.inherits(classDef, baseHandler);
	
	classDef.prototype.GetBlocks = function (success, error){
		return this.Context.DatabaseContext.Blocks.forge().fetch()
				.then(success).catch(error);
	};
	
	classDef.prototype.AddBlock = function(block, success, error) {
		return this.Context.DatabaseContext.Block.forge().save(block)
				.then(success).catch(error);
	};
	
	module.exports = classDef;
})();