import Auid from "../Core/Auid";
import BaseModel from "../Core/BaseModel";
import Database from "../Core/Database";

import PermissionDef from "./PermissionDef";

var tableName = 'adminpermission';
	
class ModelClass extends BaseModel {
    TableName() {
        return tableName;
    }

    Relations(authContext, skipFilter) {
        return {
			PermissionDef: function() {
				return this.belongsTo(PermissionDef.Model(authContext, skipFilter), 'permissiondefid');
			}
		};
    }
}

export default new ModelClass();