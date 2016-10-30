import AjaxService from './AjaxService.jsx';

var endpoint = "/BlockContainers";

export default class BlockContainerService {
    static GetBlockContainers(pageId) {
        return AjaxService.Get(endpoint + "?pageId=" + pageId, {}, {});
    }

    static AddBlockContainer(pageId, code) {
        return AjaxService.Post(endpoint, { pageId: pageId, code: code }, {});
    }

    static SaveBlockContainer(blockContainer) {
        return AjaxService.Put(endpoint, { blockContainer: blockContainer }, {});
    }
    
    static DeleteBlockContainer(blockContainerId) {
        return AjaxService.Delete(endpoint + "?blockContainerId=" + blockContainerId, {}, {});
    }
}