import TableName from "../Core/Decorators/TableName";

import BaseModel from "../Core/BaseModel";

import PluginDef from "./PluginDef";

@TableName('plugin')
class ModelClass extends BaseModel {
    constructor() {
        super();
    }

    Filter(authContext, query) {
		if(authContext.ClientID) {
			query.where('clientid', '=', authContext.ClientID);
		}
    }

    Relations(authContext, skipFilter) {
        return {
			PluginDef: function() {
				return this.belongsTo(PluginDef.Model(authContext, skipFilter), 'plugindefid');
			}
		};
    }
}

export default new ModelClass();