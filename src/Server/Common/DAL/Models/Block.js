(function () {
	var Database = require("../Core/Database");
	var Page = require("./Page");
	var Site = require("./Site");
	var Client = require("./Client");

	var block = Database.Model.extend({
		tableName: 'block',
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