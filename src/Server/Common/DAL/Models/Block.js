(function () {
	var Auid = require("../Core/Auid");
	var Database = require("../Core/Database");

	var Page = require("./Page");
	var Site = require("./Site");
	var Client = require("./Client");

	var block = Database.Model.extend({
		tableName: 'block',
			constructor: function() {
				Database.Model.apply(this, arguments);
				this.on("fetching", Auid.Fetching(['id', 'pageid', 'blockdefid', 'client.id']));
				this.on("fetched", Auid.Fetched(['id', 'pageid', 'blockdefid']));
				this.on("saving", Auid.Saving(['id', 'pageid', 'blockdefid']));
				this.on("destroying", Auid.Destroying(['id']));
			},
		Page: function() {
			return this.belongsTo(Page, 'pageid');
		},
		Site: function() {
			return this.belongsTo(Site, 'siteid').through(Page, 'pageid');
		},
		Client: function() {
			return this.belongsTo(Client, 'clientid').through(Page, 'pageid').through(Site, 'siteid');
		}
	});

	module.exports = block;
})();