import TableName from "../Core/Decorators/TableName";


import Auid from "../Core/Auid";
import BaseModel from "../Core/BaseModel";
import Database from "../Core/Database";

import Site from "./Site";
import Client from "./Client";

@TableName('SiteVersion')
class SiteVersion extends BaseModel {
    constructor() {
        super();
    }

    BelongsTo() {
        var belongsTo = super.BelongsTo();

        belongsTo.push({ Title: 'Site', Type: Site, Field: "SiteID"  });
        belongsTo.push({ Title: 'Client', Type: Client, Field: "ClientID", Through: [
            { Title: 'Site', Type: Site, Field: 'SiteID' }
        ] });

        return belongsTo;
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
			query.where('siteversion.id', '=', authContext.SiteVersionID);
		}
    }
}

export default new SiteVersion();