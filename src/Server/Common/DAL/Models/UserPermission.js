import TableName from "../Core/Decorators/TableName";


import BaseModel from "../Core/BaseModel";

import PermissionDef from "./PermissionDef";

@TableName('AdminPermission')
class UserPermission extends BaseModel {
    constructor() {
        super();
    }

    BelongsTo() {
        var belongsTo = super.BelongsTo();

        belongsTo.push({ Title: 'PermissionDef', Type: PermissionDef, Field: "PermissionDefID"  });

        return belongsTo;
    }
}

export default new UserPermission();