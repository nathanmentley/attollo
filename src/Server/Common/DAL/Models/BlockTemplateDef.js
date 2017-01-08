import TableName from "../Core/Decorators/TableName";
import SystemData from "../Core/Decorators/SystemData";

import BaseModel from "../Core/BaseModel";
    
import BlockDef from "./BlockDef";

@SystemData()
@TableName('BlockTemplateDef')
class BlockTemplateDef extends BaseModel {
    constructor() {
        super();
    }

    BelongsTo() {
        var belongsTo = super.BelongsTo();

        belongsTo.push({ Title: 'BlockDef', Type: BlockDef, Field: "BlockDefID"  });

        return belongsTo;
    }
}

export default new BlockTemplateDef();