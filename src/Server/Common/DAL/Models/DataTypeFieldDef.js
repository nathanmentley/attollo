import Auid from "../Core/Auid";
import BaseModel from "../Core/BaseModel";
import Database from "../Core/Database";

import DataTypeDef from "./DataTypeDef";
import DataTypeFieldType from "./DataTypeFieldType";

var tableName = 'datatypefielddef';
	
class ModelClass extends BaseModel {
    constructor() {
        super();
    }

    TableName() {
        return tableName;
    }

    Relations(authContext, skipFilter) {
        return {
			DataTypeDef: function() {
				return this.belongsTo(DataTypeDef.Model(authContext, skipFilter), 'datatypedefid');
			},
			DataTypeFieldType: function() {
				return this.belongsTo(Client.DataTypeFieldType(authContext, skipFilter), 'datatypefieldtypeid');
			}
		};
    }
}

export default new ModelClass();