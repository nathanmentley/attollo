(function () {
	var baseHandler = require('../../BaseHandler')
	var util = require('util');

	var classDef = function (context) {
		baseHandler.apply(this);
		this.Context = context;
	};
	util.inherits(classDef, baseHandler);
	
	classDef.prototype.GetClients = function (success, error){
		return this.Context.DatabaseContext.Clients.forge().fetch()
				.then(success).catch(error);
	};
	
	classDef.prototype.AddClient = function(client, success, error) {
		return this.Context.DatabaseContext.Client.forge().save(client)
				.then(success).catch(error);
	};
	
	module.exports = classDef;
})();