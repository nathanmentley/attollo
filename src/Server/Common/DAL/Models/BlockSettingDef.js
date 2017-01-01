import TableName from "../Core/Decorators/TableName";
import BelongsTo from "../Core/Decorators/BelongsTo";

import BaseModel from "../Core/BaseModel";
    
import BlockDef from "./BlockDef";
import SettingType from "./SettingType";

@TableName('BlockSettingDef')
@BelongsTo('BlockDef', BlockDef, "BlockDefID")
@BelongsTo('SettingType', SettingType, "SettingTypeID")
class BlockSettingDef extends BaseModel {
    constructor() {
        super();
    }
}

export default new BlockSettingDef();