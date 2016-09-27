(function () {
	var baseHandler = require('../../BaseHandler')
	var util = require('util');

	var self = {};
	var classDef = function (context) {
		baseHandler.apply(this, self, context);
	};
	util.inherits(classDef, baseHandler);
	
	classDef.prototype.GetPages = function (success, error){
		return self.Context.DatabaseContext.Pages.forge().fetch()
				.then(success).catch(error);
	};
	
	classDef.prototype.AddPage = function(page, success, error) {
		return self.Context.DatabaseContext.Page.forge().save(page)
				.then(success).catch(error);
	};
	
	module.exports = classDef;
})();