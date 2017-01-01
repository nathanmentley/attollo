import TableName from "../Core/Decorators/TableName";

import BaseModel from "../Core/BaseModel";

@TableName('databaseversion')
class DatabaseVersion extends BaseModel {
    constructor() {
        super();
    }
}

export default new DatabaseVersion();