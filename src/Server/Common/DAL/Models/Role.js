import TableName from "../Core/Decorators/TableName";
import HasMany from "../Core/Decorators/HasMany";
import SystemData from "../Core/Decorators/SystemData";

import BaseModel from "../Core/BaseModel";

import RolePermission from "./RolePermission";

@SystemData()
@TableName('Role')
@HasMany('RolePermissions', RolePermission, "RoleID")
class Role extends BaseModel {
    constructor() {
        super();
    }
}

export default new Role();