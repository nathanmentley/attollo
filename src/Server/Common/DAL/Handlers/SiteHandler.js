import { Dependencies } from 'constitute';

import BaseHandler from '../BaseHandler';
import HandlerContext from "../../HandlerContext";

import SiteVersionType from '../Models/SiteVersion';

@Dependencies(
    HandlerContext
)
export default class BlockHandler extends BaseHandler {
    constructor(handlerContext) {
        super(handlerContext);
    }

    GetSite(authContext, domain){
		return this.Context.DatabaseContext.Sites(authContext, true)
			.query({
				where: {
					domain: domain
				}
			}).fetch();
	};
	
	GetCurrentSiteVersion(authContext, site){
		return this.Context.DatabaseContext.SiteVersions(authContext, true)
			.query({
				where: {
					siteid: site.get('id'),
					current: true
				}
			}).fetch();
	};

	//Site

	GetSiteById(authContext, siteId){
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

	GetSites(authContext){
		return this.Context.DatabaseContext.Sites(authContext)
				.fetch({
					withRelated: [
						"Theme"
					]
				});
	};
	
	AddSite(authContext, transaction, themeId){
		var Site = this.Context.DatabaseContext.Site(authContext);
		var site = new Site({
			clientid: authContext.ClientID,
			domain: 'example.com',
			name: 'new site',
			themeid: themeId
		});

		return site.save(null, { transacting: transaction });
	};
	
	UpdateSite(authContext, transaction, model){
		var Site = this.Context.DatabaseContext.Site(authContext);
		var site = new Site(model);

		return site.save(null, { transacting: transaction });
	};
	
	DeleteSite(authContext, transaction, model){
		var Site = this.Context.DatabaseContext.Site(authContext);
		var site = new Site(model);

		return site.destroy({ transacting: transaction });
	};


	GetSiteVersions(authContext, siteId){
		return this.Context.DatabaseContext.SiteVersions(authContext)
			.query({
				where: {
					siteid: siteId
				}
			}).fetch();
	};

	AddSiteVersion(authContext, transaction, siteId, siteVersionStatusId){
		var SiteVersion = this.Context.DatabaseContext.SiteVersion(authContext);
		var siteVersion = new SiteVersion({
			siteversionstatusid: siteVersionStatusId,
			siteid: siteId,
			current: true
		});

		return siteVersion.save(null, { transacting: transaction });
	};

    ExportSiteVersion(authContext, siteVersionId) {
        return this.ExportModel(SiteVersionType)(authContext, siteVersionId);
    }

    ImportSiteVersion(authContext, transaction, siteVersion) {
        return this.ImportModel(SiteVersionType)(authContext, transaction, siteVersion);
    }

	CloneSiteVersion(authContext, transaction, siteVersionId) {
		return this.CloneModel(SiteVersionType)(authContext, transaction, siteVersionId);
	}

	GetSiteVersionStatus(authContext, code){
		return this.Context.DatabaseContext.SiteVersionStatuses(authContext)
			.query({
				where: {
					code: code
				}
			}).fetch();
	};

	GetSiteVersionStatuses(authContext){
		return this.Context.DatabaseContext.SiteVersionStatuses(authContext).fetch();
	};

	AddSiteVersionStatus(authContext, transaction, name, code){
		var SiteVersionStatus = this.Context.DatabaseContext.SiteVersionStatus(authContext);
		var siteVersionStatus = new SiteVersionStatus({
			name: name,
			code: code
		});

		return siteVersionStatus.save(null, { transacting: transaction });
	};
}