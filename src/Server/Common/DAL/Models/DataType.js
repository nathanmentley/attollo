import TableName from "../Core/Decorators/TableName";



import BaseModel from "../Core/BaseModel";

import DataTypeDef from "./DataTypeDef";
import DataTypeField from "./DataTypeField";

@TableName('datatype')
class DataType extends BaseModel {
    constructor() {
        super();
    }

    BelongsTo() {
        var belongsTo = super.BelongsTo();

        belongsTo.push({ Title: 'DataTypeDef', Type: DataTypeDef, Field: "DataTypeDefID"  });

        return belongsTo;
    }

    HasMany() {
        var hasMany = super.HasMany();

        hasMany.push({ Title: 'DataTypeFields', Type: DataTypeField, Field: "DataTypeID"  });

        return hasMany;
    }

    Filter(authContext, query) {
		if(authContext.ClientID) {
			query.where('clientid', '=', authContext.ClientID);
		}
    }
}

export default new DataType();