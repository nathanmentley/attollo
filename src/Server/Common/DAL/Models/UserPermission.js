import BaseModel from "../Core/BaseModel";

import PermissionDef from "./PermissionDef";
	
class ModelClass extends BaseModel {
    constructor() {
        super();
    }

    TableName() {
        return 'adminpermission';
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