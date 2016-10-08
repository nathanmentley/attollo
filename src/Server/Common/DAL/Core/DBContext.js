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

	classDef.prototype.DatabaseVersions = Database.Bookshelf.Collection.extend({
	  model: require("../Models/DatabaseVersion")
	});
	classDef.prototype.DatabaseVersion = require("../Models/DatabaseVersion");

	classDef.prototype.Pages = Database.Bookshelf.Collection.extend({
	  model: require("../Models/Page")
	});
	classDef.prototype.Page = require("../Models/Page");

	classDef.prototype.Sites = Database.Bookshelf.Collection.extend({
	  model: require("../Models/Site")
	});
	classDef.prototype.Site = require("../Models/Site");

	module.exports = new classDef();
})();