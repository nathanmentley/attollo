(function () {
	var Auid = require("../Core/Auid");
	var Database = require("../Core/Database");

	var Client = require("./Client");

	var filter = function(authContext, query) {
		query.join('client', 'client.id', '=', 'site.clientid');
		query.where('client.id', '=', authContext.ClientID);
	};

	var model = function(authContext, skipFilter) {
		return Database.Model.extend({
			tableName: 'site',
			constructor: function() {
				Database.Model.apply(this, arguments);
				this.on("fetching", Auid.Fetching(authContext, filter, ['id', 'clientid', 'client.id'], skipFilter));
				this.on("fetched", Auid.Fetched(authContext, filter, ['id', 'clientid'], skipFilter));
				this.on("saving", Auid.Saving(authContext, filter, ['id', 'clientid'], skipFilter));
				this.on("destroying", Auid.Destroying(authContext, filter, ['id'], skipFilter));
			},
			Client: function() {
				return this.belongsTo(Client, 'clientid');
			}
		});
	};

	var collection = function(authContext, skipFilter) {
		return Database.Bookshelf.Collection.extend({
			model: model(authContext, skipFilter)
		}).forge()
		.on("fetching", Auid.Fetching(authContext, filter, ['id', 'clientid', 'client.id'], skipFilter))
		.on("fetched", Auid.Fetched(authContext, filter, ['id', 'clientid'], skipFilter))
		.on("saving", Auid.Saving(authContext, filter, ['id', 'clientid'], skipFilter))
		.on("destroying", Auid.Destroying(authContext, filter, ['id'], skipFilter));
	};
	
	module.exports = { Model: model, Collection: collection };
})();