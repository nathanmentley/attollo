import TableName from "../Core/Decorators/TableName";
import BelongsTo from "../Core/Decorators/BelongsTo";

import BaseModel from "../Core/BaseModel";

import DataTypeDef from "./DataTypeDef";
import DataTypeFieldType from "./DataTypeFieldType";

@TableName('datatypefielddef')
@BelongsTo('DataTypeDef', DataTypeDef, "DataTypeDefID")
@BelongsTo('DataTypeFieldType', DataTypeFieldType, "DataTypeFieldTypeID")
class ModelClass extends BaseModel {
    constructor() {
        super();
    }
}

export default new ModelClass();