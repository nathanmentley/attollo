import AjaxService from './AjaxService.jsx';

var endpoint = "/Blocks";

export default class BlockService {
    static GetBlocks(blockContainerId) {
        return AjaxService.Get(endpoint + "?blockContainerId=" + blockContainerId, {}, {});
    }
}