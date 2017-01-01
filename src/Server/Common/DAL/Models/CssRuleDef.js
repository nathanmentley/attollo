import TableName from "../Core/Decorators/TableName";
import SystemData from "../Core/Decorators/SystemData";
import BelongsTo from "../Core/Decorators/BelongsTo";

import BaseModel from "../Core/BaseModel";

import CssRuleDefType from "./CssRuleDefType";
import CssRuleDefGroup from "./CssRuleDefGroup";

@SystemData()
@TableName('cssruledef')
@BelongsTo('CssRuleDefType', CssRuleDefType, "CssRuleDefTypeID")
@BelongsTo('CssRuleDefGroup', CssRuleDefGroup, "CssRuleDefGroupID")
class ModelClass extends BaseModel {
    constructor() {
        super();
    }
}

export default new ModelClass();