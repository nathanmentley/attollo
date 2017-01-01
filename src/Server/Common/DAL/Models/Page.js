import TableName from "../Core/Decorators/TableName";
import BelongsTo from "../Core/Decorators/BelongsTo";

import Auid from "../Core/Auid";
import BaseModel from "../Core/BaseModel";
import Database from "../Core/Database";

import SiteVersion from "./SiteVersion";
import Site from "./Site";
import Client from "./Client";
import PageDef from "./PageDef";

@TableName('Page')
@BelongsTo('SiteVersion', SiteVersion, "SiteVersionID")
@BelongsTo('PageDef', PageDef, "PageDefID")
@BelongsTo('Site', Site, "SiteID", [
    { Type: SiteVersion, Field: 'SiteVersionID' }
])
@BelongsTo('Client', Client, "ClientID", [
    { Type: Site, Field: 'SiteID' },
    { Type: SiteVersion, Field: 'SiteVersionID' }
])
class Page extends BaseModel {
    constructor() {
        super();
    }

    Filter(authContext, query) {
		if(authContext.ClientID) {
			var subQuery = Database.Knex.select('clientid').from('site')
				.leftJoin('siteversion', 'site.id', '=', 'siteversion.siteid');

			query.whereRaw(
				'(' + subQuery + ' where siteversion.id = page.siteversionid) = ' + Auid.Decode(authContext.ClientID)
			);
		}

		if(authContext.SiteID) {
			var subQuery = Database.Knex.select('siteid').from('siteversion');

			query.whereRaw(
				'(' + subQuery + ' where siteversion.id = page.siteversionid) = ' + Auid.Decode(authContext.SiteID)
			);
		}
		
		if(authContext.SiteVersionID) {
			query.where('siteversionid', '=', authContext.SiteVersionID);
		}
    }
}

export default new Page();