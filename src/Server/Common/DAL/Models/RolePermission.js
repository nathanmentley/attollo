import TableName from "../Core/Decorators/TableName";

import SystemData from "../Core/Decorators/SystemData";

import BaseModel from "../Core/BaseModel";

import PermissionDef from "./PermissionDef";

@SystemData()
@TableName('RolePermission')
class RolePermission extends BaseModel {
    constructor() {
        super();
    }

    BelongsTo() {
        var belongsTo = super.BelongsTo();

        belongsTo.push({ Title: 'PermissionDef', Type: PermissionDef, Field: "PermissionDefID"  });

        return belongsTo;
    }
}

export default new RolePermission();