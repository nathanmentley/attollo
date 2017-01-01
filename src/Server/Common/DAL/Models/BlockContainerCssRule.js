import TableName from "../Core/Decorators/TableName";
import BelongsTo from "../Core/Decorators/BelongsTo";

import BaseModel from "../Core/BaseModel";

import CssRule from "./CssRule";

@TableName('blockcontainercssrule')
@BelongsTo('CssRule', CssRule, "cssruleid")
class ModelClass extends BaseModel {
    constructor() {
        super();
    }
}

export default new ModelClass();