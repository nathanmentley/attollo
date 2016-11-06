import AjaxService from './AjaxService.jsx';

var endpoint = "/Users";

export default class UserService {
    static GetUsers() {
        return AjaxService.Get(endpoint, {}, {});
    }

    static AddUser(name, password) {
        return AjaxService.Post(endpoint, { username: name, password: password }, {});
    }

    static SaveUser(user) {
        return AjaxService.Put(endpoint, { user: user }, {});
    }
    
    static DeleteUser(userId) {
        return AjaxService.Delete(endpoint + "?userId=" + userId, {}, {});
    }
}