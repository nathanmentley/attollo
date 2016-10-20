import AjaxService from './AjaxService.jsx';

var endpoint = "/BlockContainerDefs";

export default class BlockContainerDefService {
    static GetBlockContainerDefs() {
        return AjaxService.Get(endpoint, {}, {});
    }
}