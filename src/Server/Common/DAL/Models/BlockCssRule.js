import TableName from "../Core/Decorators/TableName";


import BaseModel from "../Core/BaseModel";

import CssRule from "./CssRule";

@TableName('blockcssrule')
class ModelClass extends BaseModel {
    constructor() {
        super();
    }

    BelongsTo() {
        var belongsTo = super.BelongsTo();

        belongsTo.push({ Title: 'CssRule', Type: CssRule, Field: "CssRuleID"  });

        return belongsTo;
    }

    SerializableRelations() {
        return [
            { Title: 'CssRule', Type: CssRule }
        ];
    }
}

export default new ModelClass();