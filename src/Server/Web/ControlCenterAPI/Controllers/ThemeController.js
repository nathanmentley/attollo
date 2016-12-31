import { Dependencies } from 'constitute';

import Attollo from '../../../Common/Attollo';
import BaseController from '../BaseController';

@Dependencies(
    Attollo
)
export default class ThemeController extends BaseController {
    constructor(attollo) {
        super(attollo);
    }

    get UrlEndpoint() { return '/Themes'; }

    GetLogic(request, response) {
        return this._attollo.Services.Theme.GetThemes(request.AuthContext);
    }
};