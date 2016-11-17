import AjaxService from './AjaxService.jsx';

var endpoint = "/BlockCssRules";

export default class BlockCssRuleService {
    static GetBlockCssRules(blockId) {
        return AjaxService.Get(endpoint + "?blockId=" + blockId, {}, {});
    }

    static UpdateBlockCssRules(rules) {
        return AjaxService.Put(endpoint, { rules: rules }, {});
    }
}