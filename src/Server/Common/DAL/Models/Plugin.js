import Auid from "../Core/Auid";
import BaseModel from "../Core/BaseModel";
import Database from "../Core/Database";

import PluginDef from "./PluginDef";

var tableName = 'plugin';
	
class ModelClass extends BaseModel {
    TableName() {
        return tableName;
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