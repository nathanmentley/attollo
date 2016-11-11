(function () {
	var baseHandler = require('../../BaseHandler')
	var util = require('util');

	var classDef = function (context) {
		baseHandler.apply(this);
		this.Context = context;
	};
	util.inherits(classDef, baseHandler);
	
	classDef.prototype.GetSite = function (authContext, domain){
		return this.Context.DatabaseContext.Sites(authContext, true)
			.query({
				where: {
					domain: domain
				}
			}).fetch();
	};
	
	classDef.prototype.GetCurrentSiteVersion = function (authContext, site){
		return this.Context.DatabaseContext.SiteVersions(authContext, true)
			.query({
				where: {
					siteid: site.get('id'),
					current: true
				}
			}).fetch();
	};


	classDef.prototype.GetSites = function (authContext){
		return this.Context.DatabaseContext.Sites(authContext).fetch();
	};
	
	classDef.prototype.AddSite = function (authContext, themeId){
		var Site = this.Context.DatabaseContext.Site(authContext);
		var site = new Site({
			clientid: authContext.ClientID,
			domain: 'example.com',
			name: 'new site',
			themeid: themeId
		});

		return site.save();
	};
	
	classDef.prototype.UpdateSite = function (authContext, model){
		var Site = this.Context.DatabaseContext.Site(authContext);
		var site = new Site(model);

		return site.save();
	};
	
	classDef.prototype.DeleteSite = function (authContext, model){
		var Site = this.Context.DatabaseContext.Site(authContext);
		var site = new Site(model);

		return site.destroy();
	};


	classDef.prototype.GetSiteVersions = function (authContext, siteId){
		return this.Context.DatabaseContext.SiteVersions(authContext)
			.query({
				where: {
					siteid: siteId
				}
			}).fetch();
	};

	classDef.prototype.AddSiteVersion = function (authContext, siteId, siteVersionStatusId){
		var SiteVersion = this.Context.DatabaseContext.SiteVersion(authContext);
		var siteVersion = new SiteVersion({
			siteversionstatusid: siteVersionStatusId,
			siteid: siteId,
			current: true
		});

		return siteVersion.save();
	};


	classDef.prototype.GetSiteVersionStatus = function (authContext, code){
		return this.Context.DatabaseContext.SiteVersionStatuses(authContext)
			.query({
				where: {
					code: code
				}
			}).fetch();
	};

	classDef.prototype.GetSiteVersionStatuses = function (authContext){
		return this.Context.DatabaseContext.SiteVersionStatuses(authContext).fetch();
	};

	classDef.prototype.AddSiteVersionStatus = function (authContext, name, code){
		var SiteVersionStatus = this.Context.DatabaseContext.SiteVersionStatus(authContext);
		var siteVersionStatus = new SiteVersionStatus({
			name: name,
			code: code
		});

		return siteVersionStatus.save();
	};
	
	module.exports = classDef;
})();