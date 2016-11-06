(function () {
	var Auid = require("../Core/Auid");
	var Database = require("../Core/Database");

	var PageDef = require("./PageDef");

	var filter = function(authContext, query) {
	};

	var model = function(authContext, skipFilter) {
		return Database.Model.extend({
			tableName: 'blockdef',
			constructor: function() {
				Database.Model.apply(this, arguments);
				this.on("fetching", Auid.Fetching(authContext, filter, skipFilter));
				this.on("fetched", Auid.Fetched(authContext, filter, skipFilter));
				this.on("saving", Auid.Saving(authContext, filter, skipFilter));
				this.on("destroying", Auid.Destroying(authContext, filter, skipFilter));
			},
			PageDef: function() {
				return this.belongsTo(PageDef.Model(authContext, skipFilter), 'pagedefid');
			},
			BlockSettingDefs: function() {
				var BlockSettingDef = require("./BlockSettingDef");
				return this.hasMany(BlockSettingDef.Model(authContext, skipFilter), "blockdefid");
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