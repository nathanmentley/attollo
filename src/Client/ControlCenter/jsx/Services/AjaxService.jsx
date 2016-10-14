import axios from 'axios';

import Config from '!json!../config.json';

//Private vars
var $ajax = axios.create();
var authenticated = false;
var onAuthenticateCallbacks = [];
var onUnauthenticateCallbacks = [];

export default class AjaxService {
    //Interface Methods
    static SetAuth(token) {
        $ajax = axios.create();
        $ajax.defaults.headers.common['Authorization'] = 'Bearer ' + token;

        authenticated = true;

        onAuthenticateCallbacks.forEach((callback) => {
            callback();
        });
    }

    static ClearAuth() {
        $ajax = axios.create();
        authenticated = false;

        onUnauthenticateCallbacks.forEach((callback) => {
            callback();
        });
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

    //Event listeners
    static OnAuthenticate(callback){
        onAuthenticateCallbacks.push(callback);

        if (authenticated) {
            callback();
        }
    }

    static OnUnauthenticate(callback){
        onUnauthenticateCallbacks.push(callback);

        if(!authenticated) {
            callback();
        }
    }
}