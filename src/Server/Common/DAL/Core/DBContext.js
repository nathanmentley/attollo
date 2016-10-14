(function () {
	var classDef = function () {};
	var Database = require("./Database");


	classDef.prototype.NonFiltered = {
		DatabaseVersions: function() {
			return Database.Bookshelf.Collection.extend({
				model: require("../Models/DatabaseVersion")
			}).forge();
		},
		Users: function() {
			return Database.Bookshelf.Collection.extend({
				model: require("../Models/User")
			}).forge();
		}
	};

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

	classDef.prototype.BlockDefs = function(authContext) {
		return Database.Bookshelf.Collection.extend({
			model: require("../Models/BlockDef")
		}).forge()
		.on("fetching", function(model, columns, options) {
			return new Promise(function(resolve, reject) {
				if(options.query._statements){
					for(var i = 0; i < options.query._statements.length; i++) {
						if(options.query._statements[i].column == "id") {
							options.query._statements[i].value = options.query._statements[i].value - 99;
						}
					}
				}

				resolve();
			});
		})
		.on("fetched", function(models, result, options) {
			return new Promise(function(resolve, reject) {
				for(var i = 1; i < models.length + 1; i++) {
					models.get(i).set({id: models.get(i).id + 99});
				}

				resolve(models);
			});
		});
	};

	classDef.prototype.Clients = function(authContext) {
		return Database.Bookshelf.Collection.extend({
			model: require("../Models/Client")
		}).forge();
	};

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

	classDef.prototype.Sites = function(authContext) {
		return Database.Bookshelf.Collection.extend({
			model: require("../Models/Site")
		}).forge()
		.query(function(query) {
			query.join('client', 'client.id', '=', 'site.clientid');
			query.where('client.id', '=', authContext.ClientID);
		});
	};

	classDef.prototype.Users = function(authContext) {
		return Database.Bookshelf.Collection.extend({
			model: require("../Models/User")
		}).forge()
		.query(function(query) {
			query.join('client', 'client.id', '=', 'site.clientid');
			query.where('client.id', '=', authContext.ClientID);
		});
	};

	module.exports = new classDef();
})();