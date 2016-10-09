(function () {
	var Database = require("../Core/Database");
	var Client = require("./Client");

	module.exports = Database.Model.extend({
		tableName: 'admin',
		Client: function() {
			return this.belongsTo(Client, 'clientid');
		}
	});
})();