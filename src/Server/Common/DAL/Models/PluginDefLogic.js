import TableName from "../Core/Decorators/TableName";
import BelongsTo from "../Core/Decorators/BelongsTo";

import BaseModel from "../Core/BaseModel";

import PluginDef from "./PluginDef";
import PluginDefLogicDef from "./PluginDefLogicDef";
import PluginDefLogicTarget from "./PluginDefLogicTarget";

@TableName('plugindeflogic')
@BelongsTo('PluginDef', PluginDef, "PluginDefID")
@BelongsTo('PluginDefLogicDef', PluginDefLogicDef, "PluginDefLogicDefID")
@BelongsTo('PluginDefLogicTarget', PluginDefLogicTarget, "PluginDefLogicTargetID")
class ModelClass extends BaseModel {
    constructor() {
        super();
    }
}

export default new ModelClass();