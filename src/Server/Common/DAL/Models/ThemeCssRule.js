import TableName from "../Core/Decorators/TableName";
import BelongsTo from "../Core/Decorators/BelongsTo";

import BaseModel from "../Core/BaseModel";

import CssRule from "./CssRule";

@TableName('ThemeCssRule')
@BelongsTo('CssRule', CssRule, "CssRuleID")
class ThemeCssRule extends BaseModel {
    constructor() {
        super();
    }
}

export default new ThemeCssRule();