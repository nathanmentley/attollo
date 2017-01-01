import TableName from "../Core/Decorators/TableName";

import BaseModel from "../Core/BaseModel";

@TableName('plugindeflogicdef')
class ModelClass extends BaseModel {
    constructor() {
        super();
    }
}

export default new ModelClass();