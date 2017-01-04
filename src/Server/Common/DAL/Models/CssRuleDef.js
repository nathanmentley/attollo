import TableName from "../Core/Decorators/TableName";
import SystemData from "../Core/Decorators/SystemData";


import BaseModel from "../Core/BaseModel";

import CssRuleDefType from "./CssRuleDefType";
import CssRuleDefGroup from "./CssRuleDefGroup";

@SystemData()
@TableName('cssruledef')
class ModelClass extends BaseModel {
    constructor() {
        super();
    }

    BelongsTo() {
        var belongsTo = super.BelongsTo();

        belongsTo.push({ Title: 'CssRuleDefType', Type: CssRuleDefType, Field: "CssRuleDefTypeID"  });
        belongsTo.push({ Title: 'CssRuleDefGroup', Type: CssRuleDefGroup, Field: "CssRuleDefGroupID"  });

        return belongsTo;
    }
}

export default new ModelClass();