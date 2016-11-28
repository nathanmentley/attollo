import AjaxService from './AjaxService.jsx';

var endpoint = "/Plugins";

export default class PluginService {
    static GetPlugins() {
        return AjaxService.Get(endpoint, {}, {});
    }

    static AddPlugin(pluginDefCode) {
        return AjaxService.Post(endpoint, { pluginDefCode: pluginDefCode }, {});
    }

    static DeletePlugin(pluginId) {
        return AjaxService.Delete(endpoint + "?pluginId=" + pluginId, {}, {});
    }
}