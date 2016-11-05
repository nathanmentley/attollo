import AjaxService from './AjaxService.jsx';

var endpoint = "/Users";

export default class UserService {
    static GetUsers() {
        return AjaxService.Get(endpoint, {}, {});
    }

    static AddUser() {
        return AjaxService.Post(endpoint, {}, {});
    }

    static SaveUser(user) {
        return AjaxService.Put(endpoint, { user: user }, {});
    }
    
    static DeleteUser(userId) {
        return AjaxService.Delete(endpoint + "?userId=" + userId, {}, {});
    }
}