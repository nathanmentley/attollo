import TableName from "../Core/Decorators/TableName";


import BaseModel from "../Core/BaseModel";

import PluginDef from "./PluginDef";
import PluginDefLogicDef from "./PluginDefLogicDef";
import PluginDefLogicTarget from "./PluginDefLogicTarget";

@TableName('plugindeflogic')
class ModelClass extends BaseModel {
    constructor() {
        super();
    }

    BelongsTo() {
        var belongsTo = super.BelongsTo();

        belongsTo.push({ Title: 'PluginDef', Type: PluginDef, Field: "PluginDefID"  });
        belongsTo.push({ Title: 'PluginDefLogicDef', Type: PluginDefLogicDef, Field: "PluginDefLogicDefID"  });
        belongsTo.push({ Title: 'PluginDefLogicTarget', Type: PluginDefLogicTarget, Field: "PluginDefLogicTargetID"  });

        return belongsTo;
    }
}

export default new ModelClass();