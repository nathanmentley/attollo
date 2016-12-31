import Auid from "../Core/Auid";
import BaseModel from "../Core/BaseModel";
import Database from "../Core/Database";

import ThemeCssRule from "./ThemeCssRule";

var tableName = 'theme';
	
class ModelClass extends BaseModel {
    constructor() {
        super();
    }

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
			ThemeCssRules: function() {
				return this.hasMany(ThemeCssRule.Model(authContext, skipFilter), 'themeid');
			}
		};
    }
}

export default new ModelClass();