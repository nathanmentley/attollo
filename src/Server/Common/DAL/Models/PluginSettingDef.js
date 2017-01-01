import TableName from "../Core/Decorators/TableName";

import BaseModel from "../Core/BaseModel";

import PluginDef from "./PluginDef";

@TableName('pluginsettingdef')
class ModelClass extends BaseModel {
    constructor() {
        super();
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