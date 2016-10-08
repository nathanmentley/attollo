import AjaxService from './AjaxService.jsx';

var endpoint = "/BlockDefs";

export default class BlockDefService {
    static GetBlockDefs() {
        return AjaxService.Get(endpoint, {}, {});
    }
}