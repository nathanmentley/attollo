import TableName from "../Core/Decorators/TableName";


import BaseModel from "../Core/BaseModel";

import Client from "./Client";
import PluginDef from "./PluginDef";

@TableName('datatypedef')
class ModelClass extends BaseModel {
    constructor() {
        super();
    }

    BelongsTo() {
        var belongsTo = super.BelongsTo();

        belongsTo.push({ Title: 'Client', Type: Client, Field: "ClientID"  });
        belongsTo.push({ Title: 'PluginDef', Type: PluginDef, Field: "PluginDefID"  });

        return belongsTo;
    }

    Filter(authContext, query) {
		if(authContext.PluginDefIds) {
			query.where('plugindefid', 'in', authContext.PluginDefIds);
		}
    }
}

export default new ModelClass();