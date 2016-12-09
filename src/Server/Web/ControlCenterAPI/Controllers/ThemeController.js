import Attollo from '../../../Common/Attollo';
import BaseController from '../BaseController';

export default class ThemeController extends BaseController {
    static get UrlEndpoint() { return '/Themes'; }

    static GetLogic(request, response) {
        return Attollo.Services.Theme.GetThemes(request.AuthContext);
    }
};