import { Dependencies } from 'constitute';

import BaseHandler from '../Core/BaseHandler';
import HandlerContext from "../../HandlerContext";

import SiteVersionType from '../Models/SiteVersion';

@Dependencies(
    HandlerContext
)
export default class BlockHandler extends BaseHandler {
    constructor(handlerContext) {
        super(handlerContext);
    }

    //Site

    GetSite(authContext, domain){
		return this.Context.DatabaseContext.Sites(authContext, true)
			.query({
				where: {
					domain: domain
				}
			}).fetch();
	};

	GetSiteById(authContext, siteId){
		return this.Context.DatabaseContext.Site(authContext)
			.query({
				where: {
					id: siteId
				}
			}).fetch();
	};

	GetSites(authContext){
		return this.Context.DatabaseContext.Sites(authContext)
				.fetch();
	};
	
	AddSite(authContext, transaction){
		var Site = this.Context.DatabaseContext.Site(authContext);
		var site = new Site({
			clientid: authContext.ClientID,
			domain: 'example.com',
			name: 'new site'
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

	//Get SiteVersion

    GetSiteVersionById(authContext, siteVersionId){
        return this.Context.DatabaseContext.SiteVersion(authContext)
            .query({
                where: {
                    id: siteVersionId
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

    GetCurrentSiteVersion(authContext, site){
        return this.Context.DatabaseContext.SiteVersions(authContext, true)
            .query({
                where: {
                    siteid: site.get('id'),
                    current: true
                }
            }).fetch();
    };

    GetSiteVersion(authContext, siteVersionId){
        return this.Context.DatabaseContext.SiteVersion(authContext)
            .query({
                where: {
                    id: siteVersionId
                }
            }).fetch({
                withRelated: [
                    'SiteVersionStatus'
                ]
            });
    };


    GetSiteVersions(authContext, siteId){
        return this.Context.DatabaseContext.SiteVersions(authContext)
            .query({
                where: {
                    siteid: siteId
                }
            }).fetch({
                withRelated: [
                    'SiteVersionStatus'
                ]
            });
    };

    GetSiteVersionsByStatusId(authContext, siteId, statusId){
        return this.Context.DatabaseContext.SiteVersions(authContext)
            .query({
                where: {
                    siteid: siteId,
					siteversionstatusid: statusId
                }
            }).fetch({
                withRelated: [
                    'SiteVersionStatus'
                ]
            });
    };

	AddSiteVersion(authContext, transaction, siteId, siteVersionStatusId, themeId){
		var SiteVersion = this.Context.DatabaseContext.SiteVersion(authContext);
		var siteVersion = new SiteVersion({
			siteversionstatusid: siteVersionStatusId,
			siteid: siteId,
            themeid: themeId,
			current: true
		});

		return siteVersion.save(null, { transacting: transaction });
	};

    UpdateSiteVersion(authContext, transaction, model){
        var SiteVersion = this.Context.DatabaseContext.SiteVersion(authContext);
        var siteVersion = new SiteVersion(model);

        return siteVersion.save(null, { transacting: transaction });
    };

    ExportSiteVersion(authContext, siteVersionId) {
        return this.ExportModel(SiteVersionType)(authContext, siteVersionId);
    }

    ImportSiteVersion(authContext, transaction, siteVersion, siteId, siteVersionStatusId) {
        return this.ImportModel(SiteVersionType)(authContext, transaction, siteVersion, { siteid: siteId, siteversionstatusid: siteVersionStatusId, current: false });
    }

	CloneSiteVersion(authContext, transaction, siteVersionId, siteId, siteVersionStatusId) {
		return this.CloneModel(SiteVersionType)(authContext, transaction, siteVersionId,  { siteid: siteId, siteversionstatusid: siteVersionStatusId, current: false });
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