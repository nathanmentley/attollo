import TableName from "../Core/Decorators/TableName";

import BaseModel from "../Core/BaseModel";
    
import BlockDef from "./BlockDef";

@TableName('blockdefdatarequest')
class ModelClass extends BaseModel {
    constructor() {
        super();
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