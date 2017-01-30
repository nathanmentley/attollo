import TableName from "../Core/Decorators/TableName";


import BaseModel from "../Core/BaseModel";

import Client from "./Client";

@TableName('Site')
class Site extends BaseModel {
    constructor() {
        super();
    }

    BelongsTo() {
        var belongsTo = super.BelongsTo();

        belongsTo.push({ Title: 'Client', Type: Client, Field: "ClientID"  });

        return belongsTo;
    }

    Filter(authContext, query) {
		if(authContext.ClientID) {
			query.where('clientid', '=', authContext.ClientID);
		}

		if(authContext.SiteID) {
			query.where('id', '=', authContext.SiteID);
		}
		
    }
}

export default new Site();