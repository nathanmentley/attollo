import TableName from "../Core/Decorators/TableName";


import BaseModel from "../Core/BaseModel";

import DataTypeDef from "./DataTypeDef";
import DataTypeFieldType from "./DataTypeFieldType";

@TableName('datatypefielddef')
class ModelClass extends BaseModel {
    constructor() {
        super();
    }

    BelongsTo() {
        var belongsTo = super.BelongsTo();

        belongsTo.push({ Title: 'DataTypeDef', Type: DataTypeDef, Field: "DataTypeDefID"  });
        belongsTo.push({ Title: 'DataTypeFieldType', Type: DataTypeFieldType, Field: "DataTypeFieldTypeID"  });

        return belongsTo;
    }
}

export default new ModelClass();