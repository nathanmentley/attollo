import AjaxService from './AjaxService.jsx';

var endpoint = "/Plugins";

export default class PluginService {
    static GetPlugins() {
        return AjaxService.Get(endpoint, {}, {});
    }
}