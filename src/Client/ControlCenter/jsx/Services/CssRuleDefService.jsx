import AjaxService from './AjaxService.jsx';

var endpoint = "/CssRuleDefs";

export default class CssRuleDefService {
    static GetCssRuleDefs() {
        return AjaxService.Get(endpoint, {}, {});
    }
}