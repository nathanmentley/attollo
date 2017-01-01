import TableName from "../Core/Decorators/TableName";

import BaseModel from "../Core/BaseModel";

import DataTypeDef from "./DataTypeDef";
import DataTypeFieldType from "./DataTypeFieldType";

@TableName('datatypefielddef')
class ModelClass extends BaseModel {
    constructor() {
        super();
    }

    Relations(authContext, skipFilter) {
        return {
			DataTypeDef: function() {
				return this.belongsTo(DataTypeDef.Model(authContext, skipFilter), 'datatypedefid');
			},
			DataTypeFieldType: function() {
				return this.belongsTo(DataTypeFieldType(authContext, skipFilter), 'datatypefieldtypeid');
			}
		};
    }
}

export default new ModelClass();