import TableName from "../Core/Decorators/TableName";
import BelongsTo from "../Core/Decorators/BelongsTo";

import BaseModel from "../Core/BaseModel";

import PluginDef from "./PluginDef";

@TableName('PluginSettingDef')
@BelongsTo('PluginDef', PluginDef, "PluginDefID")
class PluginSettingDef extends BaseModel {
    constructor() {
        super();
    }
}

export default new PluginSettingDef();