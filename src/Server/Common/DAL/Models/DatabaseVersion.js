import BaseModel from "../Core/BaseModel";
	
class DatabaseVersion extends BaseModel {
    constructor() {
        super();
    }

    TableName() {
        return 'databaseversion';
    }
}

export default new DatabaseVersion();