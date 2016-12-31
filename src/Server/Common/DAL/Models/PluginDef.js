import Auid from "../Core/Auid";
import BaseModel from "../Core/BaseModel";
import Database from "../Core/Database";

var tableName = 'plugindef';
	
class ModelClass extends BaseModel {
    constructor() {
        super();
    }

    TableName() {
        return tableName;
    }

    Filter(authContext, query) {
		if(authContext.ClientID) {
			query.whereNull('clientid')
				.orWhere('clientid', '=', authContext.ClientID);
		}
    }
}

export default new ModelClass();