import BaseModel from "../Core/BaseModel";

class PageDef extends BaseModel {
    TableName() {
        return 'pagedef';
    }

    Filter(authContext, query) {
		if(authContext.PluginDefIds) {
			query.where('plugindefid', 'in', authContext.PluginDefIds);
		}
    }
}

export default new PageDef();