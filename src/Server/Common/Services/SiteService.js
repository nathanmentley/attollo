(function () {
	var Context;
	var classDef = function (serviceContext) {
		Context = serviceContext;
	};
	
	classDef.prototype.GetSite = function (authContext, domain){
		return Context.Handlers.Site.GetSite(authContext, domain);
	};

	classDef.prototype.GetCurrentSiteVersion = function (authContext, site){
		return Context.Handlers.Site.GetCurrentSiteVersion(authContext, site);
	};

	classDef.prototype.GetSites = function (authContext){
		return Context.Handlers.Site.GetSites(authContext);
	};
	
	classDef.prototype.AddSite = function (authContext){
		return Context.Handlers.Site.AddSite(authContext);
	};

	classDef.prototype.UpdateSite = function (authContext, model){
		return Context.Handlers.Site.UpdateSite(authContext, model);
	};

	classDef.prototype.DeleteSite = function (authContext, model){
		return Context.Handlers.Site.DeleteSite(authContext, model);
	};
	
	module.exports = classDef;
})();
