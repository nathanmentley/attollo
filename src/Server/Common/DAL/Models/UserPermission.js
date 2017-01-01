import TableName from "../Core/Decorators/TableName";
import BelongsTo from "../Core/Decorators/BelongsTo";

import BaseModel from "../Core/BaseModel";

import PermissionDef from "./PermissionDef";

@TableName('AdminPermission')
@BelongsTo('PermissionDef', PermissionDef, "PermissionDefID")
class UserPermission extends BaseModel {
    constructor() {
        super();
    }
}

export default new UserPermission();