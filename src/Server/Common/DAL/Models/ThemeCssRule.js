import TableName from "../Core/Decorators/TableName";

import BaseModel from "../Core/BaseModel";

import CssRule from "./CssRule";

@TableName('themecssrule')
class ModelClass extends BaseModel {
    constructor() {
        super();
    }

    Relations(authContext, skipFilter) {
        return {
			CssRule: function() {
				return this.belongsTo(CssRule.Model(authContext, skipFilter), 'cssruleid');
			}
		};
    }
}

export default new ModelClass();