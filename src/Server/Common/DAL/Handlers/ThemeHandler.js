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

    GetThemes(authContext){
		return this.Context.DatabaseContext.Themes(authContext).fetch();
	};
	
	GetTheme(authContext, code){
		return this.Context.DatabaseContext.Theme(authContext)
				.query({
					where: {
						code: code
					}
				})
				.fetch();
	};
	
	AddTheme(authContext, transaction, pluginDefId, code, name){
		var Theme = this.Context.DatabaseContext.Theme(authContext);
		var theme = new Theme({
			plugindefid: pluginDefId,
			code: code,
			name: name
		});

		return theme.save(null, { transacting: transaction });
	};
	
	AddThemeCssRule(authContext, transaction, themeId, cssRuleId){
		var ThemeCssRule = this.Context.DatabaseContext.ThemeCssRule(authContext);
		var themeCssRule = new ThemeCssRule({
			themeid: themeId,
			cssruleid: cssRuleId
		});

		return themeCssRule.save(null, { transacting: transaction });
	};
}