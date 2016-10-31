import AjaxService from './AjaxService.jsx';

var endpoint = "/BlockTemplateDefs";

export default class BlockTemplateDefService {
    static GetBlockTemplateDef() {
        return AjaxService.Get(endpoint, {}, {});
    }
}