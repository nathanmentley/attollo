import TableName from "../Core/Decorators/TableName";
import SystemData from "../Core/Decorators/SystemData";

import BaseModel from "../Core/BaseModel";

@SystemData()
@TableName('plugindeflogicdef')
class ModelClass extends BaseModel {
    constructor() {
        super();
    }
}

export default new ModelClass();