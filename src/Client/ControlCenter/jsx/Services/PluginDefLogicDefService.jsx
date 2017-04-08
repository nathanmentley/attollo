import AjaxService from './AjaxService.jsx';

var endpoint = "/PluginDefLogicDefs";

export default class PluginDefLogicDefService {
	static GetPluginDefLogicDefs() {
		return AjaxService.Get(endpoint, {}, {});
	}
}