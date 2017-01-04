import TableName from "../Core/Decorators/TableName";


import BaseModel from "../Core/BaseModel";
    
import BlockDef from "./BlockDef";

@TableName('BlockDefFunction')
class BlockDefFunction extends BaseModel {
    constructor() {
        super();
    }

    BelongsTo() {
        var belongsTo = super.BelongsTo();

        belongsTo.push({ Title: 'BlockDef', Type: BlockDef, Field: "BlockDefID"  });

        return belongsTo;
    }
}

export default new BlockDefFunction();