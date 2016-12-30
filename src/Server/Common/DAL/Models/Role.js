import Auid from "../Core/Auid";
import BaseModel from "../Core/BaseModel";
import Database from "../Core/Database";

import RolePermission from "./RolePermission";

	var filter = function(authContext, query) {
	};

	var tableName = 'role';
	
class ModelClass extends BaseModel {
    TableName() {
        return tableName;
    }

    Filter(authContext, query) {
		filter(authContext, query);
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