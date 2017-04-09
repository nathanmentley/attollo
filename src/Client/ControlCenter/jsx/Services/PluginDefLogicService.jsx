import AjaxService from './AjaxService.jsx';

var endpoint = "/PluginDefLogics";

export default class PluginDefLogicsService {
    static GetPluginDefLogics(pluginDefId) {
        return AjaxService.Get(endpoint + "?pluginDefId=" + pluginDefId, {}, {});
    }

	static AddPluginDefLogic(model) {
		return AjaxService.Post(endpoint, { logic: model }, {});
	}

	static UpdatePluginDefLogic(model) {
		return AjaxService.Put(endpoint, { logic: model }, {});
	}

	static DeletePluginDefLogic(model) {
		return AjaxService.Delete(endpoint + "?pluginDefLogicId=" + model.id, {}, {});
	}
}