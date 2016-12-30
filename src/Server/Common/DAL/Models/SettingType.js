import Auid from "../Core/Auid";
import BaseModel from "../Core/BaseModel";
import Database from "../Core/Database";

var tableName = 'settingtype';
	
class ModelClass extends BaseModel {
    TableName() {
        return tableName;
    }
}

export default new ModelClass();