import Auid from "../Core/Auid";
import BaseModel from "../Core/BaseModel";
import Database from "../Core/Database";

import PluginDef from "./PluginDef";
import PluginDefLogicDef from "./PluginDefLogicDef";
import PluginDefLogicTarget from "./PluginDefLogicTarget";

var tableName = 'plugindeflogic';
	
class ModelClass extends BaseModel {
    constructor() {
        super();
    }

    TableName() {
        return tableName;
    }
	
    Relations(authContext, skipFilter) {
        return {
			PluginDef: function() {
				return this.belongsTo(PluginDef.Model(authContext, skipFilter), 'plugindefid');
			},
			PluginDefLogicDef: function() {
				return this.belongsTo(PluginDefLogicDef.Model(authContext, skipFilter), 'plugindeflogicdefid');
			},
			PluginDefLogicTarget: function() {
				return this.belongsTo(PluginDefLogicTarget.Model(authContext, skipFilter), 'plugindeflogictargetid');
			}
		};
    }
}

export default new ModelClass();