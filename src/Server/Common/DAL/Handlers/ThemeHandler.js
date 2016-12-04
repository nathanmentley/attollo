import BaseHandler from '../BaseHandler';
export default class BlockHandler extends BaseHandler {
	static GetThemes(authContext){
		return this.Context.DatabaseContext.Themes(authContext).fetch();
	};
	
	static GetTheme(authContext, code){
		return this.Context.DatabaseContext.Theme(authContext)
				.query({
					where: {
						code: code
					}
				})
				.fetch();
	};
	
	static AddTheme(authContext, transaction, pluginDefId, code, name){
		var Theme = this.Context.DatabaseContext.Theme(authContext);
		var theme = new Theme({
			plugindefid: pluginDefId,
			code: code,
			name: name
		});

		return theme.save(null, { transacting: transaction });
	};
	
	static AddThemeCssRule(authContext, transaction, themeId, cssRuleId){
		var ThemeCssRule = this.Context.DatabaseContext.ThemeCssRule(authContext);
		var themeCssRule = new ThemeCssRule({
			themeid: themeId,
			cssruleid: cssRuleId
		});

		return themeCssRule.save(null, { transacting: transaction });
	};
}