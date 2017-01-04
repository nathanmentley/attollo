import TableName from "../Core/Decorators/TableName";



import BaseModel from "../Core/BaseModel"

import PageDef from "./PageDef";

import BlockDefDataRequest from "./BlockDefDataRequest";
import BlockDefFunction from "./BlockDefFunction";
import BlockSettingDef from "./BlockSettingDef";

@TableName('blockdef')
class ModelClass extends BaseModel {
    constructor() {
        super();
    }

    BelongsTo() {
        var belongsTo = super.BelongsTo();

        belongsTo.push({ Title: 'PageDef', Type: PageDef, Field: "pagedefid"  });

        return belongsTo;
    }

    HasMany() {
        var hasMany = super.HasMany();

        hasMany.push({ Title: 'BlockSettingDefs', Type: BlockSettingDef, Field: "blockdefid"  });
        hasMany.push({ Title: 'BlockDefDataRequests', Type: BlockDefDataRequest, Field: "blockdefid"  });
        hasMany.push({ Title: 'BlockDefFunctions', Type: BlockDefFunction, Field: "blockdefid"  });

        return hasMany;
    }

    Filter(authContext, query) {
		if(authContext.PluginDefIds) {
			query.where('plugindefid', 'in', authContext.PluginDefIds);
		}
    }
}

export default new ModelClass();