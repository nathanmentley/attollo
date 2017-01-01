import TableName from "../Core/Decorators/TableName";

import BaseModel from "../Core/BaseModel";

@TableName('plugindef')
class ModelClass extends BaseModel {
    constructor() {
        super();
    }

    Filter(authContext, query) {
		if(authContext.ClientID) {
			query.whereNull('clientid')
				.orWhere('clientid', '=', authContext.ClientID);
		}
    }
}

export default new ModelClass();