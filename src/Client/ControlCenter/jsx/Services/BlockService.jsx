import AjaxService from './AjaxService.jsx';

var endpoint = "/Blocks";

export default class BlockService {
    static GetBlocks(blockContainerId) {
        return AjaxService.Get(endpoint + "?blockContainerId=" + blockContainerId, {}, {});
    }

    static GetSiteVersionBlocks(siteVersionId) {
        return AjaxService.Get(endpoint + "?siteVersionId=" + siteVersionId, {}, {});
    }

    static AddBlock(siteVersionId, blockContainerId, areaCode, code, templateCode) {
        return AjaxService.Post(endpoint, { siteVersionId: siteVersionId, blockContainerId: blockContainerId, areaCode: areaCode, code: code, templateCode: templateCode }, {});
    }

    static SaveBlock(block) {
        return AjaxService.Put(endpoint, { block: block }, {});
    }
    
    static DeleteBlock(blockId) {
        return AjaxService.Delete(endpoint + "?blockId=" + blockId, {}, {});
    }
}