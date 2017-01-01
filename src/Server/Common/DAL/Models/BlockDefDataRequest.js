import TableName from "../Core/Decorators/TableName";
import BelongsTo from "../Core/Decorators/BelongsTo";

import BaseModel from "../Core/BaseModel";
    
import BlockDef from "./BlockDef";

@TableName('BlockDefDataRequest')
@BelongsTo('BlockDef', BlockDef, "BlockDefID")
class BlockDefDataRequest extends BaseModel {
    constructor() {
        super();
    }
}

export default new BlockDefDataRequest();