import BaseHandler from '../BaseHandler';
export default class BlockHandler extends BaseHandler {
	//CssRuleDefType

	static AddCssRuleDefType(authContext, transaction, name, code){
		var CssRuleDefType = this.Context.DatabaseContext.CssRuleDefType(authContext);
		var cssRuleDefType = new CssRuleDefType({
            name: name,
            code: code
        });

		return cssRuleDefType.save(null, { transacting: transaction });
	};
	
	static GetCssRuleDefType(authContext, code){
		return this.Context.DatabaseContext.CssRuleDefType(authContext)
				.query({
					where: {
						code: code
					}
				})
				.fetch();
	};
	
	//CssRuleDefGroup

	static AddCssRuleDefGroup(authContext, transaction, name, code, description){
		var CssRuleDefGroup = this.Context.DatabaseContext.CssRuleDefGroup(authContext);
		var cssRuleDefGroup = new CssRuleDefGroup({
            name: name,
            code: code,
			description: description
        });

		return cssRuleDefGroup.save(null, { transacting: transaction });
	};
	
	static GetCssRuleDefGroup(authContext, code){
		return this.Context.DatabaseContext.CssRuleDefGroup(authContext)
				.query({
					where: {
						code: code
					}
				})
				.fetch();
	};
	
	//CssRuleDef

	static AddCssRuleDef(authContext, transaction, name, code, property, description, options, cssRuleDefTypeId, cssRuleDefGroupId){
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
	
	static GetCssRuleDef(authContext, code){
		return this.Context.DatabaseContext.CssRuleDef(authContext)
				.query({
					where: {
						code: code
					}
				})
				.fetch({ withRelated: [ "CssRuleDefType", "CssRuleDefGroup" ] });
	};
	
	static GetCssRuleDefs(authContext){
		return this.Context.DatabaseContext.CssRuleDefs(authContext)
				.fetch({ withRelated: [ "CssRuleDefType", "CssRuleDefGroup" ] });
	};

	//CssRuleDef

	static AddCssRule(authContext, transaction, selector, value, cssRuleDefId){
		var CssRule = this.Context.DatabaseContext.CssRule(authContext);
		var cssRule = new CssRule({
            selector: selector,
            value: value,
            cssruledefid: cssRuleDefId
        });

		return cssRule.save(null, { transacting: transaction });
	};

	static AddBlockCssRule(authContext, transaction, blockId, cssRuleId){
		var BlockCssRule = this.Context.DatabaseContext.BlockCssRule(authContext);
		var blockCssRule = new BlockCssRule({
            blockid: blockId,
            cssruleid: cssRuleId
        });

		return blockCssRule.save(null, { transacting: transaction });
	};

	static UpdateCssRule(authContext, transaction, model) {
		var CssRule = this.Context.DatabaseContext.CssRule(authContext);
		var cssRule = new CssRule(model);

		return cssRule.save(null, { transacting: transaction });
	};
}