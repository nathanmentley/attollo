import Auid from "../Core/Auid";
import BaseModel from "../Core/BaseModel";
import Database from "../Core/Database";

import CssRuleDef from "./CssRuleDef";

	var filter = function(authContext, query) {
	};

	var tableName = 'cssrule';
	
class ModelClass extends BaseModel {
    TableName() {
        return tableName;
    }

    Filter(authContext, query) {
		filter(authContext, query);
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