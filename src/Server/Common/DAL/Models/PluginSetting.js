import Auid from "../Core/Auid";
import BaseModel from "../Core/BaseModel";
import Database from "../Core/Database";

import Plugin from "./Plugin";
import PluginSettingDef from "./PluginSettingDef";

	var filter = function(authContext, query) {
		if(authContext.ClientID) {
			var subQuery = Database.Knex.select('clientid').from('plugin');

			query.whereRaw(
				'(' + subQuery + ' where plugin.id = pluginsetting.pluginid) = ' + Auid.Decode(authContext.ClientID)
			);
		}

		if(authContext.SiteID) {
		}
		
		if(authContext.SiteVersionID) {
		}
	};

	var tableName = 'pluginsetting';
	
class ModelClass extends BaseModel {
    TableName() {
        return tableName;
    }

    Filter(authContext, query) {
		filter(authContext, query);
    }

    Relations(authContext, skipFilter) {
        return {
			Plugin: function() {
				return this.belongsTo(Plugin.Model(authContext, skipFilter), 'pluginid');
			},
			PluginSettingDef: function() {
				return this.belongsTo(PluginSettingDef.Model(authContext, skipFilter), 'pluginsettingdefid');
			}
		};
    }
}

export default new ModelClass();