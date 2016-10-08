import axios from 'axios';

import Config from '!json!../config.json';

var $ajax;
var authenticated = false;

export default class AjaxService {
    static SetAuth(user, pass) {
        $ajax = axios.create({
            auth: {
                username: user,
                password: pass
            }
        });

        authenticated = true;
    }

    static IsAuthenticated() {
        return authenticated;
    }

    static Get(url, body, headers) {
        if(this.IsAuthenticated()) {
            return $ajax.get(Config.BaseAPIURL + url, body, headers);
        }
    }

    static Post(url, body, headers) {
        if(this.IsAuthenticated()) {
            return $ajax.post(Config.BaseAPIURL + url, body, headers);
        }
    }
}