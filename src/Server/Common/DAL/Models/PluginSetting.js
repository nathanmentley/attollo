import TableName from "../Core/Decorators/TableName";
import BelongsTo from "../Core/Decorators/BelongsTo";

import Auid from "../Core/Auid";
import BaseModel from "../Core/BaseModel";
import Database from "../Core/Database";

import Plugin from "./Plugin";
import PluginSettingDef from "./PluginSettingDef";

@TableName('PluginSetting')
@BelongsTo('Plugin', Plugin, "PluginID")
@BelongsTo('PluginSettingDef', PluginSettingDef, "PluginSettingDefID")
class PluginSetting extends BaseModel {
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
}

export default new PluginSetting();