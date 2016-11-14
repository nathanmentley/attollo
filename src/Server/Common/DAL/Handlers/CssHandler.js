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
	
	//CssRuleDef

	classDef.prototype.AddCssRuleDef = function (authContext, name, code, property, description, options, cssRuleDefTypeId){
		var CssRuleDef = this.Context.DatabaseContext.CssRuleDef(authContext);
		var cssRuleDef = new CssRuleDef({
            name: name,
            code: code,
			property: property,
            description: description,
            options: options,
            cssruledeftypeid: cssRuleDefTypeId
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
				.fetch({ withRelated: [ "CssRuleDefType" ] });
	};
	
	classDef.prototype.GetCssRuleDefs = function (authContext){
		return this.Context.DatabaseContext.CssRuleDefs(authContext)
				.fetch({ withRelated: [ "CssRuleDefType" ] });
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

	module.exports = classDef;
})();