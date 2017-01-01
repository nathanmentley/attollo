import TableName from "../Core/Decorators/TableName";

import BaseModel from "../Core/BaseModel"

import PageDef from "./PageDef";

import BlockDefDataRequest from "./BlockDefDataRequest";
import BlockDefFunction from "./BlockDefFunction";
import BlockSettingDef from "./BlockSettingDef";

@TableName('blockdef')
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
			PageDef: function() {
				return this.belongsTo(PageDef.Model(authContext, skipFilter), 'pagedefid');
			},
			BlockSettingDefs: function() {
				return this.hasMany(BlockSettingDef.Model(authContext, skipFilter), "blockdefid");
			},
			BlockDefDataRequests: function() {
				return this.hasMany(BlockDefDataRequest.Model(authContext, skipFilter), 'blockdefid');
			},
			BlockDefFunctions: function() {
				return this.hasMany(BlockDefFunction.Model(authContext, skipFilter), 'blockdefid');
			}
		};
    }
}

export default new ModelClass();