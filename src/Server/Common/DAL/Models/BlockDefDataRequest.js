import Auid from "../Core/Auid";
import BaseModel from "../Core/BaseModel";
import Database from "../Core/Database";
    
import BlockDef from "./BlockDef";

var tableName = 'blockdefdatarequest';

class ModelClass extends BaseModel {
    TableName() {
        return tableName;
    }

    Relations(authContext, skipFilter) {
        return {
			BlockDef: function() {
				return this.belongsTo(BlockDef.Model(authContext, skipFilter), 'blockdefid');
			}
		};
    }
}

export default new ModelClass();