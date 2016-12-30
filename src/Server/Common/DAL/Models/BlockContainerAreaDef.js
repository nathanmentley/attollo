import Auid from "../Core/Auid";
import BaseModel from "../Core/BaseModel";
import Database from "../Core/Database";

	var filter = function(authContext, query) {
	};

	var tableName = 'blockcontainerareadef';
	
class ModelClass extends BaseModel {
    TableName() {
        return tableName;
    }

    Filter(authContext, query) {
		filter(authContext, query);
    }
}

export default new ModelClass();