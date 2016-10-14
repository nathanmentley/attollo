(function () {
	var Database = require("../Core/Database");

	var client = Database.Model.extend({
		tableName: 'client'
	});

	module.exports = client;
})();