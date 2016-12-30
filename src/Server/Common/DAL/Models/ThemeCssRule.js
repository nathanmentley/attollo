import Auid from "../Core/Auid";
import BaseModel from "../Core/BaseModel";
import Database from "../Core/Database";

import CssRule from "./CssRule";

var tableName = 'themecssrule';
	
class ModelClass extends BaseModel {
    TableName() {
        return tableName;
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