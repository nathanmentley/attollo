import TableName from "../Core/Decorators/TableName";

import Auid from "../Core/Auid";
import BaseModel from "../Core/BaseModel";
import Database from "../Core/Database";

import Plugin from "./Plugin";
import PluginSettingDef from "./PluginSettingDef";

@TableName('pluginsetting')
class ModelClass extends BaseModel {
    constructor() {
        super();
    }

    Filter(authContext, query) {
		if(authContext.ClientID) {
			var subQuery = Database.Knex.select('clientid').from('plugin');

			query.whereRaw(
				'(' + subQuery + ' where plugin.id = pluginsetting.pluginid) = ' + Auid.Decode(authContext.ClientID)
			);
		}
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