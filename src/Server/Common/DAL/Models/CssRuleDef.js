(function () {
	var Auid = require("../Core/Auid");
	var Database = require("../Core/Database");

	var CssRuleDefType = require("./CssRuleDefType");

	var filter = function(authContext, query) {
	};

	var model = function(authContext, skipFilter) {
		return Database.Model.extend({
			tableName: 'cssruledef',
			constructor: function() {
				Database.Model.apply(this, arguments);
				this.on("fetching", Auid.Fetching(authContext, filter, skipFilter));
				this.on("fetched", Auid.Fetched(authContext, filter, skipFilter));
				this.on("saving", Auid.Saving(authContext, filter, skipFilter));
				this.on("destroying", Auid.Destroying(authContext, filter, skipFilter));
			},
			CssRuleDefType: function() {
				return this.belongsTo(CssRuleDefType.Model(authContext, skipFilter), 'cssruledeftypeid');
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