import TableName from "../Core/Decorators/TableName";
import HiddenFields from "../Core/Decorators/HiddenFields";

import BaseModel from "../Core/BaseModel";

import Client from "./Client";
import Role from "./Role";
import UserPermission from "./UserPermission";

@TableName('admin')
@HiddenFields(['password'])
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