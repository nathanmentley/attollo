import Auid from "../Core/Auid";
import BaseModel from "../Core/BaseModel";
import Database from "../Core/Database";

var tableName = 'blockcontainerdef';
	

class ModelClass extends BaseModel {
    constructor() {
        super();
    }

    TableName() {
        return tableName;
    }
}

export default new ModelClass();