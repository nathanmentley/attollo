import TableName from "../Core/Decorators/TableName";

import BaseModel from "../Core/BaseModel";

import RolePermission from "./RolePermission";

@TableName('role')
class ModelClass extends BaseModel {
    constructor() {
        super();
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