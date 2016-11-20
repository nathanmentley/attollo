(function () {
	var Context;
	var classDef = function (serviceContext) {
		Context = serviceContext;
	};

	//SiteVersion

	classDef.prototype.GetCurrentSiteVersion = function (authContext, site){
		return Context.Handlers.Site.GetCurrentSiteVersion(authContext, site);
	};

	classDef.prototype.GetSiteVersions = function (authContext, siteId){
		return Context.Handlers.Site.GetSiteVersions(authContext, siteId);
	};
	
	//Site

	classDef.prototype.GetSite = function (authContext, domain){
		return Context.Handlers.Site.GetSite(authContext, domain);
	};

	classDef.prototype.GetSites = function (authContext){
		return Context.Handlers.Site.GetSites(authContext);
	};
	
	classDef.prototype.AddSite = function (authContext, themeCode){
		var self = this;

		return new Promise(function(resolve, reject) {
			Attollo.Services.Theme.GetTheme(authContext, themeCode)
			.then((theme) => {
				self.GetSiteVersionStatus(authContext, "Published")
				.then((status) => {
					Context.DBTransaction((transaction) => {
						Context.Handlers.Site.AddSite(authContext, transaction, theme.get('id'))
						.then((site) => {
							Context.Handlers.Site.AddSiteVersion(authContext, transaction, site.get('id'), status.first().get('id'))
							.then((version) => {
								transaction.commit(site);
							}).catch((err) => {
								transaction.rollback(err);
							});
						}).catch((err) => {
							transaction.rollback(err);
						});
					})
					.then((site) => {
						resolve(site);
					})
					.catch((err) => {
						reject({ message: err.message });
					});
				}).catch((err) => {
					reject({ message: err.message });
				});
			}).catch((err) => {
				reject({ message: err.message });
			});
		});
	};

	classDef.prototype.UpdateSite = function (authContext, model){
		return Context.Handlers.Site.UpdateSite(authContext, model);
	};

	classDef.prototype.DeleteSite = function (authContext, model){
		return Context.Handlers.Site.DeleteSite(authContext, model);
	};

	//SiteVersionStatus

	classDef.prototype.GetSiteVersionStatus = function (authContext, code){
		return Context.Handlers.Site.GetSiteVersionStatus(authContext, code);
	};

	classDef.prototype.GetSiteVersionStatuses = function (authContext){
		return Context.Handlers.Site.GetSiteVersionStatuses(authContext);
	};

	classDef.prototype.AddSiteVersionStatus = function (authContext, name, code){
		return Context.Handlers.Site.AddSiteVersionStatus(authContext, name, code);
	};
	
	module.exports = classDef;
})();
