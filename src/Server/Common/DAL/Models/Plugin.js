import TableName from "../Core/Decorators/TableName";


import BaseModel from "../Core/BaseModel";

import PluginDef from "./PluginDef";

@TableName('Plugin')
class Plugin extends BaseModel {
    constructor() {
        super();
    }

    BelongsTo() {
        var belongsTo = super.BelongsTo();

        belongsTo.push({ Title: 'PluginDef', Type: PluginDef, Field: "PluginDefID"  });

        return belongsTo;
    }

    Filter(authContext, query) {
		if(authContext.ClientID) {
			query.where('clientid', '=', authContext.ClientID);
		}
    }
}

export default new Plugin();