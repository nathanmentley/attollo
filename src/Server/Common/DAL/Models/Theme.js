import TableName from "../Core/Decorators/TableName";


import BaseModel from "../Core/BaseModel";

import ThemeCssRule from "./ThemeCssRule";

@TableName('Theme')
class Theme extends BaseModel {
    constructor() {
        super();
    }

    HasMany() {
        var hasMany = super.HasMany();

        hasMany.push({ Title: 'ThemeCssRules', Type: ThemeCssRule, Field: "ThemeID"  });

        return hasMany;
    }

    Filter(authContext, query) {
		if(authContext.PluginDefIds) {
			query.where('plugindefid', 'in', authContext.PluginDefIds);
		}
    }
}

export default new Theme();