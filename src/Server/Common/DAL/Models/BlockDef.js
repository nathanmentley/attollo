import Auid from "../Core/Auid";
import BaseModel from "../Core/BaseModel";
import Database from "../Core/Database";

import PageDef from "./PageDef";

import BlockDefDataRequest from "./BlockDefDataRequest";
import BlockDefFunction from "./BlockDefFunction";
import BlockSettingDef from "./BlockSettingDef";

var tableName = 'blockdef';

class ModelClass extends BaseModel {
    TableName() {
        return tableName;
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