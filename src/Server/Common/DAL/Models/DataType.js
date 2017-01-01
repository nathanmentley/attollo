import TableName from "../Core/Decorators/TableName";

import BaseModel from "../Core/BaseModel";

import DataTypeDef from "./DataTypeDef";
import DataTypeField from "./DataTypeField";

@TableName('datatype')
class ModelClass extends BaseModel {
    constructor() {
        super();
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