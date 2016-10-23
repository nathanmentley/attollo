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
	
	classDef.prototype.AddSite = function (authContext){
		var Site = this.Context.DatabaseContext.Site(authContext);
		var site = new Site({
			clientid: authContext.ClientID,
			domain: 'example.com',
			name: 'new site'
		});

		return site.save();
	};
	
	classDef.prototype.UpdateSite = function (authContext, model){
		var Site = this.Context.DatabaseContext.Site(authContext, true);
		var site = new Site(model);

		return site.save();
	};
	
	classDef.prototype.DeleteSite = function (authContext, model){
		var Site = this.Context.DatabaseContext.Site(authContext, true);
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

	classDef.prototype.AddSiteVersions = function (authContext, siteId){
		var SiteVersion = this.Context.DatabaseContext.SiteVersion(authContext);
		var siteVersion = new SiteVersion({
			siteid: siteId,
			current: true
		});

		return siteVersion.save();
	};
	
	module.exports = classDef;
})();