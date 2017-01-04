import TableName from "../Core/Decorators/TableName";


import BaseModel from "../Core/BaseModel";

import CssRule from "./CssRule";

@TableName('ThemeCssRule')
class ThemeCssRule extends BaseModel {
    constructor() {
        super();
    }

    BelongsTo() {
        var belongsTo = super.BelongsTo();

        belongsTo.push({ Title: 'CssRule', Type: CssRule, Field: "CssRuleID"  });

        return belongsTo;
    }
}

export default new ThemeCssRule();