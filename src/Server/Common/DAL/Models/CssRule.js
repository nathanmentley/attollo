import TableName from "../Core/Decorators/TableName";


import BaseModel from "../Core/BaseModel";

import CssRuleDef from "./CssRuleDef";

@TableName('CssRule')
class CssRule extends BaseModel {
    constructor() {
        super();
    }

    BelongsTo() {
        var belongsTo = super.BelongsTo();

        belongsTo.push({ Title: 'CssRuleDef', Type: CssRuleDef, Field: "CssRuleDefID"  });

        return belongsTo;
    }
}

export default new CssRule();