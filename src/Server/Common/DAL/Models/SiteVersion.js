(function () {
	var Auid = require("../Core/Auid");
	var Database = require("../Core/Database");

	var Site = require("./Site");
	var Client = require("./Client");

	var filter = function(authContext, query) {
		if(authContext.ClientID) {
			var subQuery = Database.Knex.select('clientid').from('site');

			query.whereRaw(
				'(' + subQuery + ' where site.id = siteversion.siteid) = ' + authContext.ClientID
			);
		}

		if(authContext.SiteID) {
			var subQuery = Database.Knex.select('id').from('site');

			query.whereRaw(
				'(' + subQuery + ' where site.id = siteversion.siteid) = ' + authContext.SiteID
			);
		}
		
		if(authContext.SiteVersionID) {
			query.where('id', '=', authContext.SiteVersionID);
		}
	};

	var model = function(authContext, skipFilter) {
		return Database.Model.extend({
			tableName: 'siteversion',
			constructor: function() {
				Database.Model.apply(this, arguments);
				this.on("fetching", Auid.Fetching(authContext, filter, ['id', 'siteid', 'client.id', 'site.id'], skipFilter));
				this.on("fetched", Auid.Fetched(authContext, filter, ['id', 'siteid'], skipFilter));
				this.on("saving", Auid.Saving(authContext, filter, ['id', 'siteid'], skipFilter));
				this.on("destroying", Auid.Destroying(authContext, filter, ['id'], skipFilter));
			},
			Site: function() {
				return this.belongsTo(Site.Model(authContext, skipFilter), 'siteid');
			},
			Client: function() {
				return this.belongsTo(Client.Model(authContext, skipFilter), 'clientid')
							.through(Site.Model(authContext, skipFilter), 'siteid');
			},
		});
	};

	var collection = function(authContext, skipFilter) {
		return Database.Bookshelf.Collection.extend({
			model: model(authContext, skipFilter)
		}).forge()
		.on("fetching", Auid.Fetching(authContext, filter, ['id', 'siteid', 'client.id', 'site.id'], skipFilter))
		.on("fetched", Auid.Fetched(authContext, filter, ['id', 'siteid'], skipFilter))
		.on("saving", Auid.Saving(authContext, filter, ['id', 'siteid'], skipFilter))
		.on("destroying", Auid.Destroying(authContext, filter, ['id'], skipFilter));
	};
	
	module.exports = { Model: model, Collection: collection };
})();