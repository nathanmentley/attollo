import TableName from "../Core/Decorators/TableName";

import BaseModel from "../Core/BaseModel";

import CssRuleDefType from "./CssRuleDefType";
import CssRuleDefGroup from "./CssRuleDefGroup";

@TableName('cssruledef')
class ModelClass extends BaseModel {
    constructor() {
        super();
    }

    Relations(authContext, skipFilter) {
        return {
			CssRuleDefType: function() {
				return this.belongsTo(CssRuleDefType.Model(authContext, skipFilter), 'cssruledeftypeid');
			},
			CssRuleDefGroup: function() {
				return this.belongsTo(CssRuleDefGroup.Model(authContext, skipFilter), 'cssruledefgroupid');
			}
		};
    }
}

export default new ModelClass();