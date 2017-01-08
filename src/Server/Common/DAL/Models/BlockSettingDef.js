import TableName from "../Core/Decorators/TableName";
import SystemData from "../Core/Decorators/SystemData";

import BaseModel from "../Core/BaseModel";
    
import BlockDef from "./BlockDef";
import SettingType from "./SettingType";

@SystemData()
@TableName('BlockSettingDef')
class BlockSettingDef extends BaseModel {
    constructor() {
        super();
    }

    BelongsTo() {
        var belongsTo = super.BelongsTo();

        belongsTo.push({ Title: 'BlockDef', Type: BlockDef, Field: "BlockDefID"  });
        belongsTo.push({ Title: 'SettingType', Type: SettingType, Field: "SettingTypeID"  });

        return belongsTo;
    }
}

export default new BlockSettingDef();