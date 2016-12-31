import constitute from 'constitute';

import Attollo from '../../../Common/Attollo';
import BaseController from '../BaseController';

var attollo = constitute(Attollo);

export default class RoleController extends BaseController {
    static get UrlEndpoint() { return '/Roles'; }

    static GetLogic(request, response) {
        return attollo.Services.User.GetRoles(request.AuthContext);
    }
};