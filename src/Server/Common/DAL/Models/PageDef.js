import TableName from "../Core/Decorators/TableName";

import BaseModel from "../Core/BaseModel";

@TableName('pagedef')
class PageDef extends BaseModel {
    constructor() {
        super();
    }

    Filter(authContext, query) {
		if(authContext.PluginDefIds) {
			query.where('plugindefid', 'in', authContext.PluginDefIds);
		}
    }
}

export default new PageDef();