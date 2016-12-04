var _clientId = null;
var _userName = "*SYSTEM|DatabaseManager";
var _permissions = [];

export default class DatabaseScriptUtils {
    static get ClientID() {
        return _clientId;
    }
    static get UserName() {
        return _userName;
    }
    static get Permissions() {
        return _permissions;
    }

    static SetClientID(clientId) {
        _clientId = clientId;
    };

    static ClearClientID() {
        _clientId = null;
    };

    static SetPermissions(permissions) {
        _permissions = permissions;
    };

    static ClearPermissions() {
        _permissions = [];
    };
}