import AjaxService from './AjaxService.jsx';

var endpoint = "/Themes";

export default class ThemeService {
    static GetThemes() {
        return AjaxService.Get(endpoint, {}, {});
    }
}