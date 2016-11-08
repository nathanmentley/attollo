(function () {
    var classDef = function () {};
    
    classDef.prototype.ClientID = null;
    classDef.prototype.Permissions = [];

    classDef.prototype.SetClientID = function (clientId) {
        this.ClientID = clientId;
    };
    classDef.prototype.ClearClientID = function () {
        this.ClientID = null;
    };

    classDef.prototype.SetPermissions = function (permissions) {
        this.Permissions = permissions;
    };
    classDef.prototype.ClearPermissions = function () {
        this.Permissions = [];
    };

	module.exports = new classDef();
})();