(function () {
	var Context;
	var classDef = function (serviceContext) {
		Context = serviceContext;
	};
	
	classDef.prototype.GetSites = function (success, error){
		return Context.Handlers.Site.GetSites(success, error);
	};
	
	classDef.prototype.AddSite = function (site, success, error){
		return Context.Handlers.Site.AddSite(site, success, error);
	};
	
	module.exports = classDef;
})();
