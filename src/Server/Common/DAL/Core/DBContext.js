(function () {
	var classDef = function () {};
	var Database = require("./Database");


	classDef.prototype.RawDatabaseVersions = function() {
		return Database.Bookshelf.Collection.extend({
			model: require("../Models/DatabaseVersion")
		}).forge();
	};
	classDef.prototype.RawUsers = function() {
		return Database.Bookshelf.Collection.extend({
			model: require("../Models/User")
		}).forge();
	};
	classDef.prototype.DatabaseVersion = require("../Models/DatabaseVersion");

	classDef.prototype.Blocks = function(authContext) {
		return Database.Bookshelf.Collection.extend({
			model: require("../Models/Block")
		}).forge()
		.query(function(query) {
			query.join('page', 'page.id', '=', 'block.pageid');
			query.join('site', 'site.id', '=', 'page.siteid');
			query.join('client', 'client.id', '=', 'site.clientid');
			query.where('client.id', '=', authContext.ClientID);
		});
	};
	classDef.prototype.Block = require("../Models/Block");

	classDef.prototype.BlockDefs = function(authContext) {
		return Database.Bookshelf.Collection.extend({
			model: require("../Models/BlockDef")
		}).forge();
	};
	classDef.prototype.BlockDef = require("../Models/BlockDef");

	classDef.prototype.Clients = function(authContext) {
		return Database.Bookshelf.Collection.extend({
			model: require("../Models/Client")
		}).forge();
	};
	classDef.prototype.Client = require("../Models/Client");

	classDef.prototype.Pages = function(authContext) {
		return Database.Bookshelf.Collection.extend({
			model: require("../Models/Page")
		}).forge()
		.query(function(query) {
			query.join('site', 'site.id', '=', 'page.siteid');
			query.join('client', 'client.id', '=', 'site.clientid');
			query.where('client.id', '=', authContext.ClientID);
		});
	};
	classDef.prototype.Page = require("../Models/Page");

	classDef.prototype.Sites = function(authContext) {
		return Database.Bookshelf.Collection.extend({
			model: require("../Models/Site")
		}).forge()
		.query(function(query) {
			query.join('client', 'client.id', '=', 'site.clientid');
			query.where('client.id', '=', authContext.ClientID);
		});
	};
	classDef.prototype.Site = require("../Models/Site");

	classDef.prototype.Users = function(authContext) {
		return Database.Bookshelf.Collection.extend({
			model: require("../Models/User")
		}).forge()
		.query(function(query) {
			query.join('client', 'client.id', '=', 'site.clientid');
			query.where('client.id', '=', authContext.ClientID);
		});
	};
	classDef.prototype.User = require("../Models/User");

	module.exports = new classDef();
})();