import TableName from "../Core/Decorators/TableName";

import BaseModel from "../Core/BaseModel";

import PluginDef from "./PluginDef";
import PluginDefLogicDef from "./PluginDefLogicDef";
import PluginDefLogicTarget from "./PluginDefLogicTarget";

@TableName('plugindeflogic')
class ModelClass extends BaseModel {
    constructor() {
        super();
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