import TableName from "../Core/Decorators/TableName";
import BelongsTo from "../Core/Decorators/BelongsTo";

import Auid from "../Core/Auid";
import BaseModel from "../Core/BaseModel";
import Database from "../Core/Database";

import Site from "./Site";
import Client from "./Client";

@TableName('SiteVersion')
@BelongsTo('Site', Site, "SiteID")
@BelongsTo('Client', Client, "ClientID", [
    { Type: Site, Field: 'SiteID' }
])
class SiteVersion extends BaseModel {
    constructor() {
        super();
    }

    Filter(authContext, query) {
		if(authContext.ClientID) {
			var subQuery = Database.Knex.select('clientid').from('site');

			query.whereRaw(
				'(' + subQuery + ' where site.id = siteversion.siteid) = ' + Auid.Decode(authContext.ClientID)
			);
		}

		if(authContext.SiteID) {
			var subQuery = Database.Knex.select('id').from('site');

			query.whereRaw(
				'(' + subQuery + ' where site.id = siteversion.siteid) = ' + Auid.Decode(authContext.SiteID)
			);
		}
		
		if(authContext.SiteVersionID) {
			query.where('id', '=', authContext.SiteVersionID);
		}
    }
}

export default new SiteVersion();