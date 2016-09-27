(function () {
	var classDef = function () {};
	var Database = require("./Database");

	classDef.prototype.Pages = Database.Bookshelf.Collection.extend({
	  model: require("../Models/Page")
	});
	classDef.prototype.Page = require("../Models/Page");

	module.exports = new classDef();
})();