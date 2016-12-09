import Attollo from '../../../Common/Attollo';
import BaseController from '../BaseController';

export default class RoleController extends BaseController {
    static get UrlEndpoint() { return '/Roles'; }

    static GetLogic(request, response) {
        return Attollo.Services.User.GetRoles(request.AuthContext);
    }
};