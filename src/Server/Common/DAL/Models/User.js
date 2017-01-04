import TableName from "../Core/Decorators/TableName";
import HiddenFields from "../Core/Decorators/HiddenFields";



import BaseModel from "../Core/BaseModel";

import Client from "./Client";
import Role from "./Role";
import UserPermission from "./UserPermission";

@TableName('Admin')
@HiddenFields(['password'])
class User extends BaseModel {
    constructor() {
        super();
    }

    BelongsTo() {
        var belongsTo = super.BelongsTo();

        belongsTo.push({ Title: 'Client', Type: Client, Field: "ClientID"  });
        belongsTo.push({ Title: 'Role', Type: Role, Field: "RoleID"  });

        return belongsTo;
    }

    HasMany() {
        var hasMany = super.HasMany();

        hasMany.push({ Title: 'UserPermissions', Type: UserPermission, Field: "AdminID"  });

        return hasMany;
    }

    Filter(authContext, query) {
		if(authContext.ClientID) {
			query.where('clientid', '=', authContext.ClientID);
		}
    }
}

export default new User();