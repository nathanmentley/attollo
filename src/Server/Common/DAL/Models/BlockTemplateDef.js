import TableName from "../Core/Decorators/TableName";
import BelongsTo from "../Core/Decorators/BelongsTo";

import BaseModel from "../Core/BaseModel";
    
import BlockDef from "./BlockDef";

@TableName('BlockTemplateDef')
@BelongsTo('BlockDef', BlockDef, "BlockDefID")
class BlockTemplateDef extends BaseModel {
    constructor() {
        super();
    }
}

export default new BlockTemplateDef();