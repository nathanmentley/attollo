import TableName from "../Core/Decorators/TableName";
import BelongsTo from "../Core/Decorators/BelongsTo";

import BaseModel from "../Core/BaseModel";

import Client from "./Client";
import Theme from "./Theme";

@TableName('Site')
@BelongsTo('Client', Client, "ClientID")
@BelongsTo('Theme', Theme, "ThemeID")
class Site extends BaseModel {
    constructor() {
        super();
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