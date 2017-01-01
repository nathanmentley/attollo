import TableName from "../Core/Decorators/TableName";
import BelongsTo from "../Core/Decorators/BelongsTo";
import SystemData from "../Core/Decorators/SystemData";

import BaseModel from "../Core/BaseModel";

import PermissionDef from "./PermissionDef";

@SystemData()
@TableName('RolePermission')
@BelongsTo('PermissionDef', PermissionDef, "PermissionDefID")
class RolePermission extends BaseModel {
    constructor() {
        super();
    }
}

export default new RolePermission();