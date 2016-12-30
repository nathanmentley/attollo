import BaseHandler from '../BaseHandler';

import SiteVersionType from '../Models/SiteVersion';

export default class BlockHandler extends BaseHandler {
	static GetSite(authContext, domain){
		return this.Context.DatabaseContext.Sites(authContext, true)
			.query({
				where: {
					domain: domain
				}
			}).fetch();
	};
	
	static GetCurrentSiteVersion(authContext, site){
		return this.Context.DatabaseContext.SiteVersions(authContext, true)
			.query({
				where: {
					siteid: site.get('id'),
					current: true
				}
			}).fetch();
	};

	//Site

	static GetSiteById(authContext, siteId){
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

	static GetSites(authContext){
		return this.Context.DatabaseContext.Sites(authContext)
				.fetch({
					withRelated: [
						"Theme"
					]
				});
	};
	
	static AddSite(authContext, transaction, themeId){
		var Site = this.Context.DatabaseContext.Site(authContext);
		var site = new Site({
			clientid: authContext.ClientID,
			domain: 'example.com',
			name: 'new site',
			themeid: themeId
		});

		return site.save(null, { transacting: transaction });
	};
	
	static UpdateSite(authContext, transaction, model){
		var Site = this.Context.DatabaseContext.Site(authContext);
		var site = new Site(model);

		return site.save(null, { transacting: transaction });
	};
	
	static DeleteSite(authContext, transaction, model){
		var Site = this.Context.DatabaseContext.Site(authContext);
		var site = new Site(model);

		return site.destroy({ transacting: transaction });
	};


	static GetSiteVersions(authContext, siteId){
		return this.Context.DatabaseContext.SiteVersions(authContext)
			.query({
				where: {
					siteid: siteId
				}
			}).fetch();
	};

	static AddSiteVersion(authContext, transaction, siteId, siteVersionStatusId){
		var SiteVersion = this.Context.DatabaseContext.SiteVersion(authContext);
		var siteVersion = new SiteVersion({
			siteversionstatusid: siteVersionStatusId,
			siteid: siteId,
			current: true
		});

		return siteVersion.save(null, { transacting: transaction });
	};

	static CloneSiteVersion(authContext, transaction, siteVersionId) {
		var self = this;

		return new Proimse((resolve, reject) => {
			self.Context.DatabaseContext.SiteVersions(authContext)
				.query({
					where: {
						siteversionid: siteVersionId
					}
				}).fetch()
					.then((siteVersion) => {
						self.CloneModel(SiteVersionType)(authContext, transaction, siteVersion)
							.then((result) => {
								resolve(result);
							})
							.reject((err) => {
								reject(err);
							});
					})
					.catch((err) => {
						reject(err);
					});
		});
	}


	static GetSiteVersionStatus(authContext, code){
		return this.Context.DatabaseContext.SiteVersionStatuses(authContext)
			.query({
				where: {
					code: code
				}
			}).fetch();
	};

	static GetSiteVersionStatuses(authContext){
		return this.Context.DatabaseContext.SiteVersionStatuses(authContext).fetch();
	};

	static AddSiteVersionStatus(authContext, transaction, name, code){
		var SiteVersionStatus = this.Context.DatabaseContext.SiteVersionStatus(authContext);
		var siteVersionStatus = new SiteVersionStatus({
			name: name,
			code: code
		});

		return siteVersionStatus.save(null, { transacting: transaction });
	};
}