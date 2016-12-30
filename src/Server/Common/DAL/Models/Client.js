import Auid from "../Core/Auid";
import BaseModel from "../Core/BaseModel";
import Database from "../Core/Database";

var tableName = 'client';
	
class ModelClass extends BaseModel {
    TableName() {
        return tableName;
    }

    Filter(authContext, query) {
		if(authContext.ClientID) {
			query.where('id', '=', authContext.ClientID);
		}
    }
}

export default new ModelClass();