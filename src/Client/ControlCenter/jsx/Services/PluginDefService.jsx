import AjaxService from './AjaxService.jsx';

var endpoint = "/PluginDefs";

export default class PluginDefService {
    static GetPluginDefs() {
        return AjaxService.Get(endpoint, {}, {});
    }
}