(function () {
	var baseHandler = require('../../BaseHandler')
	var util = require('util');

	var classDef = function (context) {
		baseHandler.apply(this);
		this.Context = context;
	};
	util.inherits(classDef, baseHandler);
	
	classDef.prototype.GetBlockDefs = function (authContext){
		return this.Context.DatabaseContext.BlockDefs(authContext).query({
				where: {
					id: 100
				}
			}).fetch();
	};
	
	module.exports = classDef;
})();