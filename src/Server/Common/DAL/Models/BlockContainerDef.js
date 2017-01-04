import TableName from "../Core/Decorators/TableName";
import SystemData from "../Core/Decorators/SystemData";

import BaseModel from "../Core/BaseModel";

@SystemData()
@TableName('blockcontainerdef')
class ModelClass extends BaseModel {
    constructor() {
        super();
    }

    BelongsTo() {
        var belongsTo = super.BelongsTo();

        return belongsTo;
    }

    HasMany() {
        var hasMany = super.HasMany();

        return hasMany;
    }
}

export default new ModelClass();