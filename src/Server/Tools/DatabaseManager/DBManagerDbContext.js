(function () {
    var classDef = function () {};
    
    classDef.prototype.ClientID = null;

    classDef.prototype.SetClientID = function (clientId) {
        this.ClientID = clientId;
    };
    classDef.prototype.ClearClientID = function () {
        this.ClientID = null;
    };

	module.exports = new classDef();
})();