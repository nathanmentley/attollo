import TableName from "../Core/Decorators/TableName";

import BaseModel from "../Core/BaseModel";

import Client from "./Client";
import PluginDef from "./PluginDef";

@TableName('datatypedef')
class ModelClass extends BaseModel {
    constructor() {
        super();
    }

    Filter(authContext, query) {
		if(authContext.PluginDefIds) {
			query.where('plugindefid', 'in', authContext.PluginDefIds);
		}
    }

    Relations(authContext, skipFilter) {
        return {
			Client: function() {
				return this.belongsTo(Client.Model(authContext, skipFilter), 'clientid');
			},
			PluginDef: function() {
				return this.belongsTo(PluginDef.Model(authContext, skipFilter), 'plugindefid');
			}
		};
    }
}

export default new ModelClass();