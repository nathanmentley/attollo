import TableName from "../Core/Decorators/TableName";


import BaseModel from "../Core/BaseModel";
    
import BlockDef from "./BlockDef";

@TableName('BlockDefDataRequest')
class BlockDefDataRequest extends BaseModel {
    constructor() {
        super();
    }

    BelongsTo() {
        var belongsTo = super.BelongsTo();

        belongsTo.push({ Title: 'BlockDef', Type: BlockDef, Field: "BlockDefID"  });

        return belongsTo;
    }
}

export default new BlockDefDataRequest();