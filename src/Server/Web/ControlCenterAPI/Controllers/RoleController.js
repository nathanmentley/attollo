import { Dependencies } from 'constitute';

import Attollo from '../../../Common/Attollo';
import BaseController from '../BaseController';

@Dependencies(
    Attollo
)
export default class RoleController extends BaseController {
    constructor(attollo) {
        super(attollo);
    }

    get UrlEndpoint() { return '/Roles'; }

    GetLogic(request, response) {
        return this._attollo.Services.User.GetRoles(request.AuthContext);
    }
};