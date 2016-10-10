(function () {
	var baseHandler = require('../../BaseHandler')
	var util = require('util');

	var classDef = function (context) {
		baseHandler.apply(this);
		this.Context = context;
	};
	util.inherits(classDef, baseHandler);
	
	classDef.prototype.GetBlocks = function (authContext, pageId){
		return this.Context.DatabaseContext.Blocks(authContext)
			.query({
				where: {
					pageid: pageId
				}
			}).fetch();
	};
	
	module.exports = classDef;
})();