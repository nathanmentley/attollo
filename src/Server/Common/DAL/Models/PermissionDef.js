import TableName from "../Core/Decorators/TableName";

import BaseModel from "../Core/BaseModel";

@TableName('permissiondef')
class ModelClass extends BaseModel {
    constructor() {
        super();
    }
}

export default new ModelClass();