import TableName from "../Core/Decorators/TableName";

import BaseModel from "../Core/BaseModel";

import ThemeCssRule from "./ThemeCssRule";

@TableName('theme')
class ModelClass extends BaseModel {
    constructor() {
        super();
    }

    Filter(authContext, query) {
		if(authContext.PluginDefIds) {
			query.where('plugindefid', 'in', authContext.PluginDefIds);
		}
    }

    Relations(authContext, skipFilter) {
        return {
			ThemeCssRules: function() {
				return this.hasMany(ThemeCssRule.Model(authContext, skipFilter), 'themeid');
			}
		};
    }
}

export default new ModelClass();