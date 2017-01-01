import TableName from "../Core/Decorators/TableName";

import BaseModel from "../Core/BaseModel";
    
import BlockDef from "./BlockDef";
import SettingType from "./SettingType";

@TableName('blocksettingdef')
class ModelClass extends BaseModel {
    constructor() {
        super();
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