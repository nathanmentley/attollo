import AjaxService from './AjaxService.jsx';

var endpoint = "/BlockContainerAreas";

export default class BlockContainerAreaService {
    static GetBlockContainerArea(blockContainerId, areaCode) {
        return AjaxService.Get(endpoint + '?blockContainerId=' + blockContainerId + '&areaCode=' + areaCode, {}, {});
    }
}