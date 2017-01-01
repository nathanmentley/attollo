import TableName from "../Core/Decorators/TableName";

import BaseModel from "../Core/BaseModel";

@TableName('databasecodeversion')
class ModelClass extends BaseModel {
    constructor() {
        super();
    }
}

export default new ModelClass();