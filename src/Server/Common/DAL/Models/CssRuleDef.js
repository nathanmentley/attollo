import TableName from "../Core/Decorators/TableName";
import SystemData from "../Core/Decorators/SystemData";


import BaseModel from "../Core/BaseModel";

import CssRuleDefType from "./CssRuleDefType";
import CssRuleDefGroup from "./CssRuleDefGroup";

@SystemData()
@TableName('cssruledef')
class CssRuleDef extends BaseModel {
    constructor() {
        super();
    }

    BelongsTo() {
        return [
            { Title: 'CssRuleDefType', Type: CssRuleDefType, Field: "CssRuleDefTypeID"  },
            { Title: 'CssRuleDefGroup', Type: CssRuleDefGroup, Field: "CssRuleDefGroupID"  }
        ];
    }
}

export default new CssRuleDef();