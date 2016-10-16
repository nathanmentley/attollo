(function () {
	var classDef = function () {};
	var Database = require("./Database");
	var Auid = require("./Auid");

	classDef.prototype.NonFiltered = {
		DatabaseVersions: function() {
			return Database.Bookshelf.Collection.extend({
				model: require("../Models/DatabaseVersion")
			}).forge()
			.on("fetching", Auid.Fetching(['id']))
			.on("fetched", Auid.Fetched(['id']))
			.on("saving", Auid.Saving(['id']));
		},
		Users: function() {
			return Database.Bookshelf.Collection.extend({
				model: require("../Models/User")
			}).forge()
			.on("fetching", Auid.Fetching(['id', 'clientid']))
			.on("fetched", Auid.Fetched(['id', 'clientid']))
			.on("saving", Auid.Saving(['id', 'clientid']));
			;
		}
	};

	classDef.prototype.Blocks = function(authContext) {
		return Database.Bookshelf.Collection.extend({
			model: require("../Models/Block")
		}).forge()
		.on("fetching", Auid.Fetching(['id', 'blockdefid', 'pageid', 'client.id']))
		.on("fetched", Auid.Fetched(['id', 'blockdefid', 'pageid']))
		.on("saving", Auid.Saving(['id', 'blockdefid', 'pageid']))
		.on("destroying", Auid.Destroying(['id']))
		.query(function(query) {
			query.join('page', 'page.id', '=', 'block.pageid');
			query.join('site', 'site.id', '=', 'page.siteid');
			query.join('client', 'client.id', '=', 'site.clientid');
			query.where('client.id', '=', authContext.ClientID);
		});
	};

	classDef.prototype.BlockDefs = function(authContext) {
		return Database.Bookshelf.Collection.extend({
			model: require("../Models/BlockDef")
		}).forge()
		.on("fetching", Auid.Fetching(['id']))
		.on("fetched", Auid.Fetched(['id']))
		.on("saving", Auid.Saving(['id']));
	};

	classDef.prototype.Clients = function(authContext) {
		return Database.Bookshelf.Collection.extend({
			model: require("../Models/Client")
		}).forge()
		.on("fetching", Auid.Fetching(['id']))
		.on("fetched", Auid.Fetched(['id']))
		.on("saving", Auid.Saving(['id']));
	};

	classDef.prototype.Pages = function(authContext) {
		return Database.Bookshelf.Collection.extend({
			model: require("../Models/Page")
		}).forge()
		.on("fetching", Auid.Fetching(['id', 'siteid', 'client.id']))
		.on("fetched", Auid.Fetched(['id', 'siteid']))
		.on("saving", Auid.Saving(['id', 'siteid']))
		.query(function(query) {
			query.join('site', 'site.id', '=', 'page.siteid');
			query.join('client', 'client.id', '=', 'site.clientid');
			query.where('client.id', '=', authContext.ClientID);
		});
	};

	classDef.prototype.Sites = function(authContext) {
		return Database.Bookshelf.Collection.extend({
			model: require("../Models/Site")
		}).forge()
		.on("fetching", Auid.Fetching(['id', 'clientid', 'client.id']))
		.on("fetched", Auid.Fetched(['id', 'clientid']))
		.on("saving", Auid.Saving(['id', 'clientid']))
		.query(function(query) {
			query.join('client', 'client.id', '=', 'site.clientid');
			query.where('client.id', '=', authContext.ClientID);
		});
	};

	classDef.prototype.Users = function(authContext) {
		return Database.Bookshelf.Collection.extend({
			model: require("../Models/User")
		}).forge()
		.on("fetching", Auid.Fetching(['id', 'clientid', 'client.id']))
		.on("fetched", Auid.Fetched(['id', 'clientid']))
		.on("saving", Auid.Saving(['id', 'clientid']))
		.query(function(query) {
			query.join('client', 'client.id', '=', 'site.clientid');
			query.where('client.id', '=', authContext.ClientID);
		});
	};

	module.exports = new classDef();
})();