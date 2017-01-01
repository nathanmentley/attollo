import TableName from "../Core/Decorators/TableName";

import BaseModel from "../Core/BaseModel";

import PermissionDef from "./PermissionDef";

@TableName('adminpermission')
class ModelClass extends BaseModel {
    constructor() {
        super();
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