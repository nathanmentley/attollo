(function () {
	var Database = require("../Core/Database");

	module.exports = Database.Model.extend({
		tableName: 'admin'
	});
})();