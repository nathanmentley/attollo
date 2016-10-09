(function () {
	var baseHandler = require('../../BaseHandler')
	var util = require('util');

	var classDef = function (context) {
		baseHandler.apply(this);
		this.Context = context;
	};
	util.inherits(classDef, baseHandler);
	
	classDef.prototype.GetPages = function (authContext){
		return this.Context.DatabaseContext.Pages(authContext).fetch();
	};
	
	classDef.prototype.AddPage = function(authContext, page) {
		return this.Context.DatabaseContext.Page.forge().save(page);
	};
	
	module.exports = classDef;
})();