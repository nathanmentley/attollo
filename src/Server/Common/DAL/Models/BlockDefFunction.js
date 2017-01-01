import TableName from "../Core/Decorators/TableName";
import BelongsTo from "../Core/Decorators/BelongsTo";

import BaseModel from "../Core/BaseModel";
    
import BlockDef from "./BlockDef";

@TableName('BlockDefFunction')
@BelongsTo('BlockDef', BlockDef, "BlockDefID")
class BlockDefFunction extends BaseModel {
    constructor() {
        super();
    }
}

export default new BlockDefFunction();