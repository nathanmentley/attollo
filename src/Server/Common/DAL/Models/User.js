import TableName from "../Core/Decorators/TableName";
import HiddenFields from "../Core/Decorators/HiddenFields";
import BelongsTo from "../Core/Decorators/BelongsTo";
import HasMany from "../Core/Decorators/HasMany";

import BaseModel from "../Core/BaseModel";

import Client from "./Client";
import Role from "./Role";
import UserPermission from "./UserPermission";

@TableName('Admin')
@HiddenFields(['password'])
@BelongsTo('Client', Client, "ClientID")
@BelongsTo('Role', Role, "RoleID")
@HasMany('UserPermissions', UserPermission, "AdminID")
class User extends BaseModel {
    constructor() {
        super();
    }

    Filter(authContext, query) {
		if(authContext.ClientID) {
			query.where('clientid', '=', authContext.ClientID);
		}
    }
}

export default new User();