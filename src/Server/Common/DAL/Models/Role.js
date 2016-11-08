(function () {
	var Auid = require("../Core/Auid");
	var Database = require("../Core/Database");

	var RolePermission = require("./RolePermission");

	var filter = function(authContext, query) {
	};

	var model = function(authContext, skipFilter) {
		return Database.Model.extend({
			tableName: 'role',
			constructor: function() {
				Database.Model.apply(this, arguments);
				this.on("fetching", Auid.Fetching(authContext, filter, skipFilter));
				this.on("fetched", Auid.Fetched(authContext, filter, skipFilter));
				this.on("saving", Auid.Saving(authContext, filter, skipFilter));
				this.on("destroying", Auid.Destroying(authContext, filter, skipFilter));
			},
			RolePermisions: function() {
				return this.hasMany(RolePermission.Model(authContext, skipFilter), 'roleid');
			}
		});
	};

	var collection = function(authContext, skipFilter) {
		return Database.Bookshelf.Collection.extend({
			model: model(authContext, skipFilter)
		}).forge()
		.on("fetching", Auid.Fetching(authContext, filter, skipFilter))
		.on("fetched", Auid.Fetched(authContext, filter, skipFilter))
		.on("saving", Auid.Saving(authContext, filter, skipFilter))
		.on("destroying", Auid.Destroying(authContext, filter, skipFilter));
	};
	
	module.exports = { Model: model, Collection: collection };
})();