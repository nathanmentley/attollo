import TableName from "../Core/Decorators/TableName";
import BelongsTo from "../Core/Decorators/BelongsTo";

import BaseModel from "../Core/BaseModel";

import Client from "./Client";
import PluginDef from "./PluginDef";

@TableName('datatypedef')
@BelongsTo('Client', Client, "ClientID")
@BelongsTo('PluginDef', PluginDef, "PluginDefID")
class ModelClass extends BaseModel {
    constructor() {
        super();
    }

    Filter(authContext, query) {
		if(authContext.PluginDefIds) {
			query.where('plugindefid', 'in', authContext.PluginDefIds);
		}
    }
}

export default new ModelClass();