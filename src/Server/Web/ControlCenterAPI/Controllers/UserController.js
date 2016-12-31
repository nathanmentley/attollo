import { Dependencies } from 'constitute';

import Attollo from '../../../Common/Attollo';
import BaseController from '../BaseController';

@Dependencies(
    Attollo
)
export default class UserController extends BaseController {
    constructor(attollo) {
        super(attollo);
    }

    get UrlEndpoint() { return '/Users'; }

    GetLogic(request, response) {
        return this._attollo.Services.User.GetUsers(request.AuthContext);
    }
    PostLogic(request, response) {
        return this._attollo.Services.User.AddUser(request.AuthContext, request.body.username, request.body.password);
    }
    PutLogic(request, response) {
        return this._attollo.Services.User.UpdateUser(request.AuthContext, request.body.user);
    }
    DeleteLogic(request, response) {
        return this._attollo.Services.User.DeleteUser(request.AuthContext, { id: request.query.userId });
    }
};