import { Dependencies } from 'constitute';

import BaseHandler from '../Core/BaseHandler';
import HandlerContext from "../../HandlerContext";

@Dependencies(
    HandlerContext
)
export default class BlockHandler extends BaseHandler {
    constructor(handlerContext) {
        super(handlerContext);
    }

    //CssRuleDefType

	AddCssRuleDefType(authContext, transaction, name, code){
		var CssRuleDefType = this.Context.DatabaseContext.CssRuleDefType(authContext);
		var cssRuleDefType = new CssRuleDefType({
            name: name,
            code: code
        });

		return cssRuleDefType.save(null, { transacting: transaction });
	};
	
	GetCssRuleDefType(authContext, code){
		return this.Context.DatabaseContext.CssRuleDefType(authContext)
				.query({
					where: {
						code: code
					}
				})
				.fetch();
	};
	
	//CssRuleDefGroup

	AddCssRuleDefGroup(authContext, transaction, name, code, description){
		var CssRuleDefGroup = this.Context.DatabaseContext.CssRuleDefGroup(authContext);
		var cssRuleDefGroup = new CssRuleDefGroup({
            name: name,
            code: code,
			description: description
        });

		return cssRuleDefGroup.save(null, { transacting: transaction });
	};
	
	GetCssRuleDefGroup(authContext, code){
		return this.Context.DatabaseContext.CssRuleDefGroup(authContext)
				.query({
					where: {
						code: code
					}
				})
				.fetch();
	};
	
	//CssRuleDef

	AddCssRuleDef(authContext, transaction, name, code, property, description, options, cssRuleDefTypeId, cssRuleDefGroupId){
		var CssRuleDef = this.Context.DatabaseContext.CssRuleDef(authContext);
		var cssRuleDef = new CssRuleDef({
            name: name,
            code: code,
			property: property,
            description: description,
            options: options,
            cssruledeftypeid: cssRuleDefTypeId,
			cssruledefgroupid: cssRuleDefGroupId
        });

		return cssRuleDef.save(null, { transacting: transaction });
	};
	
	GetCssRuleDef(authContext, code){
		return this.Context.DatabaseContext.CssRuleDef(authContext)
				.query({
					where: {
						code: code
					}
				})
				.fetch({ withRelated: [ "CssRuleDefType", "CssRuleDefGroup" ] });
	};
	
	GetCssRuleDefs(authContext){
		return this.Context.DatabaseContext.CssRuleDefs(authContext)
				.fetch({ withRelated: [ "CssRuleDefType", "CssRuleDefGroup" ] });
	};

	//CssRuleDef

	AddCssRule(authContext, transaction, selector, value, cssRuleDefId){
		var CssRule = this.Context.DatabaseContext.CssRule(authContext);
		var cssRule = new CssRule({
            selector: selector,
            value: value,
            cssruledefid: cssRuleDefId
        });

		return cssRule.save(null, { transacting: transaction });
	};

	AddBlockCssRule(authContext, transaction, blockId, cssRuleId){
		var BlockCssRule = this.Context.DatabaseContext.BlockCssRule(authContext);
		var blockCssRule = new BlockCssRule({
            blockid: blockId,
            cssruleid: cssRuleId
        });

		return blockCssRule.save(null, { transacting: transaction });
	};

	UpdateCssRule(authContext, transaction, model) {
		var CssRule = this.Context.DatabaseContext.CssRule(authContext);
		var cssRule = new CssRule(model);

		return cssRule.save(null, { transacting: transaction });
	};
}