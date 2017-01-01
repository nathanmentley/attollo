import TableName from "../Core/Decorators/TableName";
import HasMany from "../Core/Decorators/HasMany";

import BaseModel from "../Core/BaseModel";

import ThemeCssRule from "./ThemeCssRule";

@TableName('Theme')
@HasMany('ThemeCssRules', ThemeCssRule, "ThemeID")
class Theme extends BaseModel {
    constructor() {
        super();
    }

    Filter(authContext, query) {
		if(authContext.PluginDefIds) {
			query.where('plugindefid', 'in', authContext.PluginDefIds);
		}
    }
}

export default new Theme();