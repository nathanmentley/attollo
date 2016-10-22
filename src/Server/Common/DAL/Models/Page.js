(function () {
	var Auid = require("../Core/Auid");
	var Database = require("../Core/Database");

	var SiteVersion = require("./SiteVersion");
	var Site = require("./Site");
	var Client = require("./Client");

	var filter = function(authContext, query) {
		query.join('siteversion', 'siteversion.id', '=', 'page.siteversionid');
		query.join('site', 'site.id', '=', 'siteversion.siteid');
		query.join('client', 'client.id', '=', 'site.clientid');
		query.where('client.id', '=', authContext.ClientID);
		
		if(authContext.SiteID) {
			query.where('site.id', '=', authContext.SiteID);
		}
		
		if(authContext.SiteVersionID) {
			query.where('siteversion.id', '=', authContext.SiteVersionID);
		}
	};

	var model = function(authContext, skipFilter) {
		return Database.Model.extend({
			tableName: 'page',
			constructor: function() {
				Database.Model.apply(this, arguments);
				this.on("fetching", Auid.Fetching(authContext, filter, ['id', 'siteversionid', 'client.id', 'site.id', 'siteversion.id'], skipFilter));
				this.on("fetched", Auid.Fetched(authContext, filter, ['id', 'siteversionid'], skipFilter));
				this.on("saving", Auid.Saving(authContext, filter, ['id', 'siteversionid'], skipFilter));
				this.on("destroying", Auid.Destroying(authContext, filter, ['id'], skipFilter));
			},
			SiteVersion: function() {
				return this.belongsTo(SiteVersion.Model(authContext, skipFilter), 'siteversionid');
			},
			Site: function() {
				return this.belongsTo(Site.Model(authContext, skipFilter), 'siteid')
							.through(SiteVersion.Model(authContext, skipFilter), 'siteversionid');
			},
			Client: function() {
				return this.belongsTo(Client.Model(authContext, skipFilter), 'clientid')
							.through(Site.Model(authContext, skipFilter), 'siteid')
							.through(SiteVersion.Model(authContext, skipFilter), 'siteversionid');
			},
		});
	};

	var collection = function(authContext, skipFilter) {
		return Database.Bookshelf.Collection.extend({
			model: model(authContext, skipFilter)
		}).forge()
		.on("fetching", Auid.Fetching(authContext, filter, ['id', 'siteversionid', 'client.id', 'site.id', 'siteversion.id'], skipFilter))
		.on("fetched", Auid.Fetched(authContext, filter, ['id', 'siteversionid'], skipFilter))
		.on("saving", Auid.Saving(authContext, filter, ['id', 'siteversionid'], skipFilter))
		.on("destroying", Auid.Destroying(authContext, filter, ['id'], skipFilter));
	};
	
	module.exports = { Model: model, Collection: collection };
})();