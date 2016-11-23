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

	//Site

	classDef.prototype.GetSiteById = function (authContext, siteId){
		return this.Context.DatabaseContext.Site(authContext)
			.query({
				where: {
					id: siteId
				}
			}).fetch({ 
				withRelated: [ 
					'Theme',
					'Theme.ThemeCssRules',
					'Theme.ThemeCssRules.CssRule',
					'Theme.ThemeCssRules.CssRule.CssRuleDef'
				]
			});
	};

	classDef.prototype.GetSites = function (authContext){
		return this.Context.DatabaseContext.Sites(authContext)
				.fetch({
					withRelated: [
						"Theme"
					]
				});
	};
	
	classDef.prototype.AddSite = function (authContext, transaction, themeId){
		var Site = this.Context.DatabaseContext.Site(authContext);
		var site = new Site({
			clientid: authContext.ClientID,
			domain: 'example.com',
			name: 'new site',
			themeid: themeId
		});

		return site.save(null, { transacting: transaction });
	};
	
	classDef.prototype.UpdateSite = function (authContext, transaction, model){
		var Site = this.Context.DatabaseContext.Site(authContext);
		var site = new Site(model);

		return site.save(null, { transacting: transaction });
	};
	
	classDef.prototype.DeleteSite = function (authContext, transaction, model){
		var Site = this.Context.DatabaseContext.Site(authContext);
		var site = new Site(model);

		return site.destroy({ transacting: transaction });
	};


	classDef.prototype.GetSiteVersions = function (authContext, siteId){
		return this.Context.DatabaseContext.SiteVersions(authContext)
			.query({
				where: {
					siteid: siteId
				}
			}).fetch();
	};

	classDef.prototype.AddSiteVersion = function (authContext, transaction, siteId, siteVersionStatusId){
		var SiteVersion = this.Context.DatabaseContext.SiteVersion(authContext);
		var siteVersion = new SiteVersion({
			siteversionstatusid: siteVersionStatusId,
			siteid: siteId,
			current: true
		});

		return siteVersion.save(null, { transacting: transaction });
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

	classDef.prototype.AddSiteVersionStatus = function (authContext, transaction, name, code){
		var SiteVersionStatus = this.Context.DatabaseContext.SiteVersionStatus(authContext);
		var siteVersionStatus = new SiteVersionStatus({
			name: name,
			code: code
		});

		return siteVersionStatus.save(null, { transacting: transaction });
	};
	
	module.exports = classDef;
})();