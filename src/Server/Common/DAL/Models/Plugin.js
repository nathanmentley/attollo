import TableName from "../Core/Decorators/TableName";
import BelongsTo from "../Core/Decorators/BelongsTo";

import BaseModel from "../Core/BaseModel";

import PluginDef from "./PluginDef";

@TableName('Plugin')
@BelongsTo('PluginDef', PluginDef, "PluginDefID")
class Plugin extends BaseModel {
    constructor() {
        super();
    }

    Filter(authContext, query) {
		if(authContext.ClientID) {
			query.where('clientid', '=', authContext.ClientID);
		}
    }
}

export default new Plugin();