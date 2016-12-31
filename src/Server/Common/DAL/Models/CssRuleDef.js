import Auid from "../Core/Auid";
import BaseModel from "../Core/BaseModel";
import Database from "../Core/Database";

import CssRuleDefType from "./CssRuleDefType";
import CssRuleDefGroup from "./CssRuleDefGroup";

var tableName = 'cssruledef';

class ModelClass extends BaseModel {
    constructor() {
        super();
    }

    TableName() {
        return tableName;
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