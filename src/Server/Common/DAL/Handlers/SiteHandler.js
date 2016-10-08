(function () {
	var baseHandler = require('../../BaseHandler')
	var util = require('util');

	var classDef = function (context) {
		baseHandler.apply(this);
		this.Context = context;
	};
	util.inherits(classDef, baseHandler);
	
	classDef.prototype.GetSites = function (success, error){
		return this.Context.DatabaseContext.Sites.forge().fetch()
				.then(success).catch(error);
	};
	
	classDef.prototype.AddSite = function(site, success, error) {
		return this.Context.DatabaseContext.Site.forge().save(site)
				.then(success).catch(error);
	};
	
	module.exports = classDef;
})();