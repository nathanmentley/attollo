import Auid from "../Core/Auid";
import BaseModel from "../Core/BaseModel";
import Database from "../Core/Database";

import Client from "./Client";
import Role from "./Role";
import UserPermission from "./UserPermission";

var tableName = 'admin';
	
class ModelClass extends BaseModel {
    constructor() {
        super();
    }

    TableName() {
        return tableName;
    }

    HiddenFields() {
        return ['password'];
    }

    Filter(authContext, query) {
		if(authContext.ClientID) {
			query.where('clientid', '=', authContext.ClientID);
		}
    }

    Relations(authContext, skipFilter) {
        return {
			Client: function() {
				return this.belongsTo(Client.Model(authContext, skipFilter), 'clientid');
			},
			Role: function() {
				return this.belongsTo(Role.Model(authContext, skipFilter), 'roleid');
			},
			UserPermissions: function() {
				return this.hasMany(UserPermission.Model(authContext, skipFilter), 'adminid');
			}
		};
    }
}

export default new ModelClass();