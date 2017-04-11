import AjaxService from './AjaxService.jsx';

var endpoint = "/Themes";

export default class ThemeService {
    static GetThemes() {
        return AjaxService.Get(endpoint, {}, {});
    }

	static AddTheme(model) {
		return AjaxService.Post(endpoint, { theme: model }, {});
	}

	static UpdateTheme(model) {
		return AjaxService.Put(endpoint, { theme: model }, {});
	}

	static DeleteTheme(model) {
		return AjaxService.Delete(endpoint + "?themeId=" + model.id, {}, {});
	}
}