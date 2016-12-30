import Auid from "../Core/Auid";
import BaseModel from "../Core/BaseModel";
import Database from "../Core/Database";

import ThemeCssRule from "./ThemeCssRule";

	var filter = function(authContext, query) {
		if(authContext.PluginDefIds) {
			query.where('plugindefid', 'in', authContext.PluginDefIds);
		}
	};

	var tableName = 'theme';
	
class ModelClass extends BaseModel {
    TableName() {
        return tableName;
    }

    Filter(authContext, query) {
		filter(authContext, query);
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