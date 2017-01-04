import TableName from "../Core/Decorators/TableName";


import Auid from "../Core/Auid";
import BaseModel from "../Core/BaseModel";
import Database from "../Core/Database";

import Plugin from "./Plugin";
import PluginSettingDef from "./PluginSettingDef";

@TableName('PluginSetting')
class PluginSetting extends BaseModel {
    constructor() {
        super();
    }

    BelongsTo() {
        var belongsTo = super.BelongsTo();

        belongsTo.push({ Title: 'Plugin', Type: Plugin, Field: "PluginID"  });
        belongsTo.push({ Title: 'PluginSettingDef', Type: PluginSettingDef, Field: "PluginSettingDefID"  });

        return belongsTo;
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