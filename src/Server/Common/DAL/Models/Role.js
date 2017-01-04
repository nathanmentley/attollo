import TableName from "../Core/Decorators/TableName";

import SystemData from "../Core/Decorators/SystemData";

import BaseModel from "../Core/BaseModel";

import RolePermission from "./RolePermission";

@SystemData()
@TableName('Role')
class Role extends BaseModel {
    constructor() {
        super();
    }

    HasMany() {
        var hasMany = super.HasMany();

        hasMany.push({ Title: 'RolePermissions', Type: RolePermission, Field: "RoleID"  });

        return hasMany;
    }
}

export default new Role();