(function () {
	var baseHandler = require('../../BaseHandler')
	var util = require('util');

	var classDef = function (context) {
		baseHandler.apply(this);
		this.Context = context;
	};
	util.inherits(classDef, baseHandler);
	
	classDef.prototype.GetClients = function (authContext){
		return this.Context.DatabaseContext.Clients(authContext).fetch();
	};
	
	classDef.prototype.AddClient = function (authContext, name){
		var Client = this.Context.DatabaseContext.Client(authContext);
		var client = new Client({ name: name });

		return client.save();
	};
	
	module.exports = classDef;
})();