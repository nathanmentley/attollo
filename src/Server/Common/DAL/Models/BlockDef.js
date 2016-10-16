(function () {
	var Auid = require("../Core/Auid");
	var Database = require("../Core/Database");

	var filter = function(authContext, query) {
	};

	var model = function(authContext, skipFilter) {
		return Database.Model.extend({
			tableName: 'blockdef',
			constructor: function() {
				Database.Model.apply(this, arguments);
				this.on("fetching", Auid.Fetching(authContext, filter, ['id'], skipFilter));
				this.on("fetched", Auid.Fetched(authContext, filter, ['id'], skipFilter));
				this.on("saving", Auid.Saving(authContext, filter, ['id'], skipFilter));
				this.on("destroying", Auid.Destroying(authContext, filter, ['id'], skipFilter));
			},
		});
	};

	var collection = function(authContext, skipFilter) {
		return Database.Bookshelf.Collection.extend({
			model: model(authContext, skipFilter)
		}).forge()
		.on("fetching", Auid.Fetching(authContext, filter, ['id'], skipFilter))
		.on("fetched", Auid.Fetched(authContext, filter, ['id'], skipFilter))
		.on("saving", Auid.Saving(authContext, filter, ['id'], skipFilter))
		.on("destroying", Auid.Destroying(authContext, filter, ['id'], skipFilter));
	};
	
	module.exports = { Model: model, Collection: collection };
})();