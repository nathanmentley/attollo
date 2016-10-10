import AjaxService from './AjaxService.jsx';

var endpoint = "/Auth";

export default class BlockDefService {
    static PostAuth(username, password) {
        return AjaxService.Post(
            endpoint,
            {
                username: username,
                password: password
            },
            {}
        );
    }
}