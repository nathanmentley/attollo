(function () {
	var Database = require("../Core/Database");
	var Site = require("./Site");
	var Client = require("./Client");

	module.exports = Database.Model.extend({
		tableName: 'page',
		Site: function() {
			return this.belongsTo(Site, 'siteid');
		},
		Client: function() {
			return this.belongsTo(Client, 'clientid').through(Site, 'siteid');
		}
	});
})();