import AjaxService from './AjaxService.jsx';

var endpoint = "/BlockContainers";

export default class BlockContainerService {
    static GetBlockContainers(pageId) {
        return AjaxService.Get(endpoint + "?pageId=" + pageId, {}, {});
    }
}