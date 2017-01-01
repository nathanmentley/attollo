import TableName from "../Core/Decorators/TableName";

import BaseModel from "../Core/BaseModel";

@TableName('cssruledefgroup')
class ModelClass extends BaseModel {
    constructor() {
        super();
    }
}

export default new ModelClass();