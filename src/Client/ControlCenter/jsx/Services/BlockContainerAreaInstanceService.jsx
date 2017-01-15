import AjaxService from './AjaxService.jsx';

var endpoint = "/BlockContainerAreaInstances";

export default class BlockContainerAreaInstanceService {
    static AddBlockContainerAreaInstance(blockContainerAreaInstance) {
        return AjaxService.Post(endpoint, { blockContainerAreaInstance: blockContainerAreaInstance }, {});
    }

    static SaveBlockContainerAreaInstance(blockContainerAreaInstance) {
        return AjaxService.Put(endpoint, { blockContainerAreaInstance: blockContainerAreaInstance }, {});
    }
}