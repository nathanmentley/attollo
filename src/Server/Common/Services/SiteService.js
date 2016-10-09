(function () {
	var Context;
	var classDef = function (serviceContext) {
		Context = serviceContext;
	};
	
	classDef.prototype.GetSites = function (authContext){
		return Context.Handlers.Site.GetSites(authContext);
	};
	
	classDef.prototype.AddSite = function (authContext, site){
		return Context.Handlers.Site.AddSite(authContext, site);
	};
	
	module.exports = classDef;
})();
