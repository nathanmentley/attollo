import TableName from "../Core/Decorators/TableName";


import BaseModel from "../Core/BaseModel";

import CssRule from "./CssRule";

@TableName('blockcontainercssrule')
class ModelClass extends BaseModel {
    constructor() {
        super();
    }

    BelongsTo() {
        var belongsTo = super.BelongsTo();

        belongsTo.push({ Title: 'CssRule', Type: CssRule, Field: "cssruleid"  });

        return belongsTo;
    }
}

export default new ModelClass();