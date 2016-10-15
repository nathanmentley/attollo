(function () {
	var baseHandler = require('../../BaseHandler')
	var util = require('util');

	var classDef = function (context) {
		baseHandler.apply(this);
		this.Context = context;
	};
	util.inherits(classDef, baseHandler);
	
	classDef.prototype.GetPages = function (authContext, siteId){
		return this.Context.DatabaseContext.Pages(authContext)
			.query({
				where: {
					siteid: siteId
				}
			}).fetch();
	};
	
	module.exports = classDef;
})();