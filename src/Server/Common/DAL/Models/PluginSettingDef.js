import Auid from "../Core/Auid";
import BaseModel from "../Core/BaseModel";
import Database from "../Core/Database";

import PluginDef from "./PluginDef";

var tableName = 'pluginsettingdef';
	
class ModelClass extends BaseModel {
    TableName() {
        return tableName;
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