import Auid from "../Core/Auid";
import BaseModel from "../Core/BaseModel";
import Database from "../Core/Database";
    
import BlockDef from "./BlockDef";
import SettingType from "./SettingType";

	var filter = function(authContext, query) {
	};

	var tableName = 'blocksettingdef';

class ModelClass extends BaseModel {
    TableName() {
        return tableName;
    }

    Filter(authContext, query) {
		filter(authContext, query);
    }

    Relations(authContext, skipFilter) {
        return {
			BlockDef: function() {
				return this.belongsTo(BlockDef.Model(authContext, skipFilter), 'blockdefid');
			},
			SettingType: function() {
				return this.belongsTo(SettingType.Model(authContext, skipFilter), 'settingtypeid');
			}
		};
    }
}

export default new ModelClass();