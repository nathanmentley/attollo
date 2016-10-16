import AjaxService from './AjaxService.jsx';

var endpoint = "/Blocks";

export default class BlockService {
    static GetBlocks(pageId) {
        return AjaxService.Get(endpoint + "?pageId=" + pageId, {}, {});
    }

    static AddBlock(pageId, code) {
        return AjaxService.Post(endpoint, { pageId: pageId, code: code }, {});
    }
}