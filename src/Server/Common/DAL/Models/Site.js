import TableName from "../Core/Decorators/TableName";

import BaseModel from "../Core/BaseModel";

import Client from "./Client";
import Theme from "./Theme";

@TableName('site')
class ModelClass extends BaseModel {
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

    Relations(authContext, skipFilter) {
        return {
			Client: function() {
				return this.belongsTo(Client.Model(authContext, skipFilter), 'clientid');
			},
			Theme: function() {
				return this.belongsTo(Theme.Model(authContext, skipFilter), 'themeid');
			}
		};
    }
}

export default new ModelClass();