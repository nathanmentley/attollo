import Attollo from '../../../Common/Attollo';
import BaseController from '../BaseController';

export default class UserController extends BaseController {
    static get UrlEndpoint() { return '/Users'; }

    static GetLogic(request, response) {
        return Attollo.Services.User.GetUsers(request.AuthContext);
    }
    static PostLogic(request, response) {
        return Attollo.Services.User.AddUser(request.AuthContext, request.body.username, request.body.password);
    }
    static PutLogic(request, response) {
        return Attollo.Services.User.UpdateUser(request.AuthContext, request.body.user);
    }
    static DeleteLogic(request, response) {
        return Attollo.Services.User.DeleteUser(request.AuthContext, { id: request.query.userId });
    }
};