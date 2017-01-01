import TableName from "../Core/Decorators/TableName";
import BelongsTo from "../Core/Decorators/BelongsTo";

import Auid from "../Core/Auid";
import BaseModel from "../Core/BaseModel";
import Database from "../Core/Database";

import DataType from "./DataType";
import DataTypeFieldDef from "./DataTypeFieldDef";

@TableName('datatypefield')
@BelongsTo('DataType', DataType, "DataTypeID")
@BelongsTo('DataTypeFieldDef', DataTypeFieldDef, "DataTypeFieldDefID")
class ModelClass extends BaseModel {
    constructor() {
        super();
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