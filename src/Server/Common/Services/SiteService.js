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

	classDef.prototype.GetSiteVersions = function (authContext, siteId){
		return Context.Handlers.Site.GetSiteVersions(authContext, siteId);
	};

	classDef.prototype.GetSites = function (authContext){
		return Context.Handlers.Site.GetSites(authContext);
	};
	
	classDef.prototype.AddSite = function (authContext){
		var auid = require("../DAL/Core/Auid");

		return new Promise(function(resolve, reject) {
			try{
				Context.Handlers.Site.AddSite(authContext)
				.then(function(site) {
					Context.Handlers.Site.AddSiteVersion(authContext, auid.Encode(site.get('id')))
					.then(function(version) {
						resolve(site);
					}).catch(function(err) {
						reject({ message: site.get('id') + " " + err.message });
					});
				}).catch(function(err) {
					reject({ message: err.message });
				});
			} catch(e) {
				reject({ message: e.message });
			}
		});
	};

	classDef.prototype.UpdateSite = function (authContext, model){
		return Context.Handlers.Site.UpdateSite(authContext, model);
	};

	classDef.prototype.DeleteSite = function (authContext, model){
		return Context.Handlers.Site.DeleteSite(authContext, model);
	};
	
	module.exports = classDef;
})();
