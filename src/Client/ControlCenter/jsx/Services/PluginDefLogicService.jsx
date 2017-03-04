import AjaxService from './AjaxService.jsx';

var endpoint = "/PluginDefLogics";

export default class PluginDefLogicsService {
    static GetPluginDefLogics(pluginDefId) {
        return AjaxService.Get(endpoint + "?pluginDefId=" + pluginDefId, {}, {});
    }

	static AddPluginDefLogic(model) {
		return AjaxService.Post(endpoint, model, {});
	}

	static UpdatePluginDefLogic(model) {
		return AjaxService.Put(endpoint, model, {});
	}
}