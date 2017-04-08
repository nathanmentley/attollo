import AjaxService from './AjaxService.jsx';

var endpoint = "/PluginDefLogicTargets";

export default class PluginDefLogicTargetService {
	static GetPluginDefLogicTargets() {
		return AjaxService.Get(endpoint, {}, {});
	}
}