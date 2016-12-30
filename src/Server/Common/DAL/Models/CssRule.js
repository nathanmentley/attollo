import Auid from "../Core/Auid";
import BaseModel from "../Core/BaseModel";
import Database from "../Core/Database";

import CssRuleDef from "./CssRuleDef";

var tableName = 'cssrule';
	
class ModelClass extends BaseModel {
    TableName() {
        return tableName;
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