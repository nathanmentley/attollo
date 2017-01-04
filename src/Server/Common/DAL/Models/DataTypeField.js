import TableName from "../Core/Decorators/TableName";


import Auid from "../Core/Auid";
import BaseModel from "../Core/BaseModel";
import Database from "../Core/Database";

import DataType from "./DataType";
import DataTypeFieldDef from "./DataTypeFieldDef";

@TableName('datatypefield')
class ModelClass extends BaseModel {
    constructor() {
        super();
    }

    BelongsTo() {
        var belongsTo = super.BelongsTo();

        belongsTo.push({ Title: 'DataType', Type: DataType, Field: "DataTypeID"  });
        belongsTo.push({ Title: 'DataTypeFieldDef', Type: DataTypeFieldDef, Field: "DataTypeFieldDefID"  });

        return belongsTo;
    }

    Filter(authContext, query) {
		if(authContext.ClientID) {
			var subQuery = Database.Knex.select('clientid').from('datatype');

			query.whereRaw(
				'(' + subQuery + ' where datatype.id = datatypefield.datatypeid) = ' + Auid.Decode(authContext.ClientID)
			);
		}
    }
}

export default new ModelClass();