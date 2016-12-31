import Auid from "../Core/Auid";
import BaseModel from "../Core/BaseModel";
import Database from "../Core/Database";

import DataTypeDef from "./DataTypeDef";



import DataTypeField from "./DataTypeField";

var tableName = 'datatype';
	
class ModelClass extends BaseModel {
    constructor() {
        super();
    }

    TableName() {
        return tableName;
    }

    Filter(authContext, query) {
		if(authContext.ClientID) {
			query.where('clientid', '=', authContext.ClientID);
		}
    }

    Relations(authContext, skipFilter) {
        return {
			DataTypeDef: function() {
				return this.belongsTo(DataTypeDef.Model(authContext, skipFilter), 'datatypedefid');
			},
			DataTypeFields: function () {
				return this.hasMany(DataTypeField.Model(authContext, skipFilter), 'datatypeid');
			}
		};
    }
}

export default new ModelClass();