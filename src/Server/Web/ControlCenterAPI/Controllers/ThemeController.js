import constitute from 'constitute';

import Attollo from '../../../Common/Attollo';
import BaseController from '../BaseController';

var attollo = constitute(Attollo);

export default class ThemeController extends BaseController {
    static get UrlEndpoint() { return '/Themes'; }

    static GetLogic(request, response) {
        return attollo.Services.Theme.GetThemes(request.AuthContext);
    }
};