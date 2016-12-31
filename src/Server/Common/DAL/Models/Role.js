import Auid from "../Core/Auid";
import BaseModel from "../Core/BaseModel";
import Database from "../Core/Database";

import RolePermission from "./RolePermission";

var tableName = 'role';
	
class ModelClass extends BaseModel {
    constructor() {
        super();
    }

    TableName() {
        return tableName;
    }

    Relations(authContext, skipFilter) {
        return {
			RolePermisions: function() {
				return this.hasMany(RolePermission.Model(authContext, skipFilter), 'roleid');
			}
		};
    }
}

export default new ModelClass();