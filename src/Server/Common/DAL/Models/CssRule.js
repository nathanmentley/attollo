import TableName from "../Core/Decorators/TableName";


import BaseModel from "../Core/BaseModel";

import CssRuleDef from "./CssRuleDef";

@TableName('CssRule')
class CssRule extends BaseModel {
    constructor() {
        super();
    }

    BelongsTo() {
        return [
            { Title: 'CssRuleDef', Type: CssRuleDef, Field: "CssRuleDefID"  }
        ];
    }

    SerializableRelations() {
        return [
            { Title: 'CssRuleDef', Type: CssRuleDef }
        ];
    }
}

export default new CssRule();