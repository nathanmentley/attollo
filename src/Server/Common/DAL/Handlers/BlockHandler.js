(function () {
	var baseHandler = require('../../BaseHandler')
	var util = require('util');

	var classDef = function (context) {
		baseHandler.apply(this);
		this.Context = context;
	};
	util.inherits(classDef, baseHandler);
	
	classDef.prototype.GetBlocks = function (authContext, pageId){
		return this.Context.DatabaseContext.Blocks.forge()
				.query({
					where: {
						pageid: pageId
					}
				}).fetch();
	};
	
	classDef.prototype.AddBlock = function(authContext, block) {
		return this.Context.DatabaseContext.Block.forge().save(block);
	};
	
	module.exports = classDef;
})();