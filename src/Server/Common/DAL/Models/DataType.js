import TableName from "../Core/Decorators/TableName";
import BelongsTo from "../Core/Decorators/BelongsTo";
import HasMany from "../Core/Decorators/HasMany";

import BaseModel from "../Core/BaseModel";

import DataTypeDef from "./DataTypeDef";
import DataTypeField from "./DataTypeField";

@TableName('datatype')
@BelongsTo('DataTypeDef', DataTypeDef, "DataTypeDefID")
@HasMany('DataTypeFields', DataTypeField, "DataTypeID")
class DataType extends BaseModel {
    constructor() {
        super();
    }

    Filter(authContext, query) {
		if(authContext.ClientID) {
			query.where('clientid', '=', authContext.ClientID);
		}
    }
}

export default new DataType();