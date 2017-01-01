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

    Filter(authContext, query) {
		if(authContext.ClientID) {
			var subQuery = Database.Knex.select('clientid').from('datatype');

			query.whereRaw(
				'(' + subQuery + ' where datatype.id = datatypefield.datatypeid) = ' + Auid.Decode(authContext.ClientID)
			);
		}
    }

    Relations(authContext, skipFilter) {
        return {
			DataType: function() {
				return this.belongsTo(DataType.Model(authContext, skipFilter), 'datatypeid');
			},
			DataTypeFieldDef: function() {
				return this.belongsTo(DataTypeFieldDef.Model(authContext, skipFilter), 'datatypefielddefid');
			}
		};
    }
}

export default new ModelClass();