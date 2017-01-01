import TableName from "../Core/Decorators/TableName";

import BaseModel from "../Core/BaseModel";

@TableName('client')
class ModelClass extends BaseModel {
    constructor() {
        super();
    }

    Filter(authContext, query) {
		if(authContext.ClientID) {
			query.where('id', '=', authContext.ClientID);
		}
    }
}

export default new ModelClass();