import axios from 'axios';

import Config from '!json!../config.json';

//Private vars
var $ajax = axios.create();
var authenticated = false;
var permissions = [];

export default class AjaxService {
    //Interface Methods
    static SetAuth(token, perms) {
        $ajax = axios.create();
        $ajax.defaults.headers.common['Authorization'] = 'Bearer ' + token;
        permissions = perms;

        authenticated = true;
    }

    static ClearAuth() {
        $ajax = axios.create();
        permissions = [];

        authenticated = false;
    }

    static HasPermission(permission) {
        for(var i = 0; i < permissions.length; i++) {
            if(permissions[i] == permission) {
                return true;
            }
        }

        return false;
    }

    static IsAuthenticated() {
        return authenticated;
    }

    //Ajax Methods
    static Get(url, body, headers) {
        return $ajax.get(Config.BaseAPIURL + url, body, headers);
    }

    static Post(url, body, headers) {
        return $ajax.post(Config.BaseAPIURL + url, body, headers);
    }

    static Put(url, body, headers) {
        return $ajax.put(Config.BaseAPIURL + url, body, headers);
    }

    static Delete(url, body, headers) {
        return $ajax.delete(Config.BaseAPIURL + url, body, headers);
    }

    static GetBaseUrl() {
        return Config.BaseAPIURL;
    }
}