import AjaxService from './AjaxService.jsx';

var endpoint = "/BlockContainerAreaInstances";

export default class BlockContainerAreaInstanceService {
    static SaveBlockContainerAreaInstance(blockContainerAreaInstance) {
        return AjaxService.Put(endpoint, { blockContainerAreaInstance: blockContainerAreaInstance }, {});
    }
}