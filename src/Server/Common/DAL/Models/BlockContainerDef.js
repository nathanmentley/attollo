import TableName from "../Core/Decorators/TableName";
import DefTable from "../Core/Decorators/DefTable";

import BaseModel from "../Core/BaseModel";

@TableName('blockcontainerdef')
class ModelClass extends BaseModel {
    constructor() {
        super();
    }
}

export default new ModelClass();