import AjaxService from './AjaxService.jsx';

var endpoint = "/ThemeCssRules";

export default class ThemeCssRuleService {
    static GetThemeCssRules(themeId) {
        return AjaxService.Get(endpoint + "?themeId=" + themeId, {}, {});
    }

    static UpdateThemeCssRules(rules) {
        return AjaxService.Put(endpoint, { rules: rules }, {});
    }
}