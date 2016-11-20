(function () {
	var baseHandler = require('../../BaseHandler')
	var util = require('util');

	var classDef = function (context) {
		baseHandler.apply(this);
		this.Context = context;
	};
	util.inherits(classDef, baseHandler);
	
	//CssRuleDefType

	classDef.prototype.AddCssRuleDefType = function (authContext, name, code){
		var CssRuleDefType = this.Context.DatabaseContext.CssRuleDefType(authContext);
		var cssRuleDefType = new CssRuleDefType({
            name: name,
            code: code
        });

		return cssRuleDefType.save();
	};
	
	classDef.prototype.GetCssRuleDefType = function (authContext, code){
		return this.Context.DatabaseContext.CssRuleDefType(authContext)
				.query({
					where: {
						code: code
					}
				})
				.fetch();
	};
	
	//CssRuleDefGroup

	classDef.prototype.AddCssRuleDefGroup = function (authContext, name, code, description){
		var CssRuleDefGroup = this.Context.DatabaseContext.CssRuleDefGroup(authContext);
		var cssRuleDefGroup = new CssRuleDefGroup({
            name: name,
            code: code,
			description: description
        });

		return cssRuleDefGroup.save();
	};
	
	classDef.prototype.GetCssRuleDefGroup = function (authContext, code){
		return this.Context.DatabaseContext.CssRuleDefGroup(authContext)
				.query({
					where: {
						code: code
					}
				})
				.fetch();
	};
	
	//CssRuleDef

	classDef.prototype.AddCssRuleDef = function (authContext, name, code, property, description, options, cssRuleDefTypeId, cssRuleDefGroupId){
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

		return cssRuleDef.save();
	};
	
	classDef.prototype.GetCssRuleDef = function (authContext, code){
		return this.Context.DatabaseContext.CssRuleDef(authContext)
				.query({
					where: {
						code: code
					}
				})
				.fetch({ withRelated: [ "CssRuleDefType", "CssRuleDefGroup" ] });
	};
	
	classDef.prototype.GetCssRuleDefs = function (authContext){
		return this.Context.DatabaseContext.CssRuleDefs(authContext)
				.fetch({ withRelated: [ "CssRuleDefType", "CssRuleDefGroup" ] });
	};

	//CssRuleDef

	classDef.prototype.AddCssRule = function (authContext, selector, value, cssRuleDefId){
		var CssRule = this.Context.DatabaseContext.CssRule(authContext);
		var cssRule = new CssRule({
            selector: selector,
            value: value,
            cssruledefid: cssRuleDefId
        });

		return cssRule.save();
	};

	classDef.prototype.AddBlockCssRule = function (authContext, blockId, cssRuleId){
		var BlockCssRule = this.Context.DatabaseContext.BlockCssRule(authContext);
		var blockCssRule = new BlockCssRule({
            blockid: blockId,
            cssruleid: cssRuleId
        });

		return blockCssRule.save();
	};

	classDef.prototype.UpdateCssRule = function(authContext, model) {
		var CssRule = this.Context.DatabaseContext.CssRule(authContext);
		var cssRule = new CssRule(model);

		return cssRule.save();
	};

	module.exports = classDef;
})();