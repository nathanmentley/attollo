import constitute from 'constitute';

import Attollo from '../../../Common/Attollo';
import BaseController from '../BaseController';

var attollo = constitute(Attollo);

export default class UserController extends BaseController {
    static get UrlEndpoint() { return '/Users'; }

    static GetLogic(request, response) {
        return attollo.Services.User.GetUsers(request.AuthContext);
    }
    static PostLogic(request, response) {
        return attollo.Services.User.AddUser(request.AuthContext, request.body.username, request.body.password);
    }
    static PutLogic(request, response) {
        return attollo.Services.User.UpdateUser(request.AuthContext, request.body.user);
    }
    static DeleteLogic(request, response) {
        return attollo.Services.User.DeleteUser(request.AuthContext, { id: request.query.userId });
    }
};