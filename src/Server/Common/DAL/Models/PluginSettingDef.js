import TableName from "../Core/Decorators/TableName";


import BaseModel from "../Core/BaseModel";

import PluginDef from "./PluginDef";

@TableName('PluginSettingDef')
class PluginSettingDef extends BaseModel {
    constructor() {
        super();
    }

    BelongsTo() {
        var belongsTo = super.BelongsTo();

        belongsTo.push({ Title: 'PluginDef', Type: PluginDef, Field: "PluginDefID"  });

        return belongsTo;
    }
}

export default new PluginSettingDef();