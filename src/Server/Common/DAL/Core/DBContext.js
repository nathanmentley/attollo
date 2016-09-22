(function () {
	var classDef = function () {};
	var Database = require("./Database");

	classDef.prototype.Contacts = Database.Bookshelf.Collection.extend({
	  model: require("../Models/Contact")
	});
	classDef.prototype.Contact = require("../Models/Contact");

	module.exports = new classDef();
})();