(function () {
	var baseHandler = require('../../BaseHandler')
	var util = require('util');

	var classDef = function (context) {
		baseHandler.apply(this);
		this.Context = context;
	};
	util.inherits(classDef, baseHandler);
	
	classDef.prototype.GetThemes = function (authContext){
		return this.Context.DatabaseContext.Themes(authContext).fetch();
	};
	
	classDef.prototype.GetTheme = function (authContext, code){
		return this.Context.DatabaseContext.Theme(authContext)
				.query({
					where: {
						code: code
					}
				})
				.fetch();
	};
	
	classDef.prototype.AddTheme = function (authContext, transaction, code, name){
		var Theme = this.Context.DatabaseContext.Theme(authContext);
		var theme = new Theme({
			code: code,
			name: name
		});

		return theme.save(null, null, null, { transacting: transaction });
	};
	
	classDef.prototype.AddThemeCssRule = function (authContext, transaction, themeId, cssRuleId){
		var ThemeCssRule = this.Context.DatabaseContext.ThemeCssRule(authContext);
		var themeCssRule = new ThemeCssRule({
			themeid: themeId,
			cssruleid: cssRuleId
		});

		return themeCssRule.save(null, null, null, { transacting: transaction });
	};

	module.exports = classDef;
})();