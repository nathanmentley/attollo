(function () {
	var baseHandler = require('../../BaseHandler')
	var util = require('util');

	var classDef = function (context) {
		baseHandler.apply(this);
		this.Context = context;
	};
	util.inherits(classDef, baseHandler);
	
	classDef.prototype.GetSites = function (authContext){
		return this.Context.DatabaseContext.Sites.forge().fetch();
	};
	
	classDef.prototype.AddSite = function(authContext, site) {
		return this.Context.DatabaseContext.Site.forge().save(site);
	};
	
	module.exports = classDef;
})();