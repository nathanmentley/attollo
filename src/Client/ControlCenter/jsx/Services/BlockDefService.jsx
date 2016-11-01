import AjaxService from './AjaxService.jsx';

var endpoint = "/BlockDefs";

export default class BlockDefService {
    static GetBlockDefs(pageDefId) {
        return AjaxService.Get(endpoint + '?pageDefId=' + pageDefId, {}, {});
    }
}