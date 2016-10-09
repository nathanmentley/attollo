(function () {
	var baseHandler = require('../../BaseHandler')
	var util = require('util');

	var classDef = function (context) {
		baseHandler.apply(this);
		this.Context = context;
	};
	util.inherits(classDef, baseHandler);
	
	classDef.prototype.GetClients = function (){
		return this.Context.DatabaseContext.Clients.forge().fetch();
	};
	
	classDef.prototype.AddClient = function(client) {
		return this.Context.DatabaseContext.Client.forge().save(client);
	};
	
	module.exports = classDef;
})();