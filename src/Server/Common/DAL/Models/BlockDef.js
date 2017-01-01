import TableName from "../Core/Decorators/TableName";
import BelongsTo from "../Core/Decorators/BelongsTo";
import HasMany from "../Core/Decorators/HasMany";

import BaseModel from "../Core/BaseModel"

import PageDef from "./PageDef";

import BlockDefDataRequest from "./BlockDefDataRequest";
import BlockDefFunction from "./BlockDefFunction";
import BlockSettingDef from "./BlockSettingDef";

@TableName('blockdef')
@BelongsTo('PageDef', PageDef, "pagedefid")
@HasMany('BlockSettingDefs', BlockSettingDef, "blockdefid")
@HasMany('BlockDefDataRequests', BlockDefDataRequest, "blockdefid")
@HasMany('BlockDefFunctions', BlockDefFunction, "blockdefid")
class ModelClass extends BaseModel {
    constructor() {
        super();
    }

    Filter(authContext, query) {
		if(authContext.PluginDefIds) {
			query.where('plugindefid', 'in', authContext.PluginDefIds);
		}
    }
}

export default new ModelClass();