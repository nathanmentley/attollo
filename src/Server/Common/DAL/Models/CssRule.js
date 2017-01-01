import TableName from "../Core/Decorators/TableName";

import BaseModel from "../Core/BaseModel";

import CssRuleDef from "./CssRuleDef";

@TableName('cssrule')
class ModelClass extends BaseModel {
    constructor() {
        super();
    }

    Relations(authContext, skipFilter) {
        return {
			CssRuleDef: function() {
				return this.belongsTo(CssRuleDef.Model(authContext, skipFilter), 'cssruledefid');
			}
		};
    }
}

export default new ModelClass();