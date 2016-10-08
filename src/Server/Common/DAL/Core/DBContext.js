(function () {
	var classDef = function () {};
	var Database = require("./Database");

	classDef.prototype.Blocks = Database.Bookshelf.Collection.extend({
	  model: require("../Models/Block")
	});
	classDef.prototype.Block = require("../Models/Block");

	classDef.prototype.BlockDefs = Database.Bookshelf.Collection.extend({
	  model: require("../Models/BlockDef")
	});
	classDef.prototype.BlockDef = require("../Models/BlockDef");

	classDef.prototype.Pages = Database.Bookshelf.Collection.extend({
	  model: require("../Models/Page")
	});
	classDef.prototype.Page = require("../Models/Page");

	module.exports = new classDef();
})();