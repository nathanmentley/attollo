import TableName from "../Core/Decorators/TableName";
import BelongsTo from "../Core/Decorators/BelongsTo";

import BaseModel from "../Core/BaseModel";

import CssRuleDef from "./CssRuleDef";

@TableName('CssRule')
@BelongsTo('CssRuleDef', CssRuleDef, "CssRuleDefID")
class CssRule extends BaseModel {
    constructor() {
        super();
    }
}

export default new CssRule();