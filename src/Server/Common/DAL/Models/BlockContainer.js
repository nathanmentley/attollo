(function () {
	var Auid = require("../Core/Auid");
	var Database = require("../Core/Database");
	var ModelEvents = require("../Core/ModelEvents");
    
	var Page = require("./Page");
	var SiteVersion = require("./SiteVersion");
	var Site = require("./Site");
	var Client = require("./Client");
	var BlockContainerDef = require("./BlockContainerDef");

	var filter = function(authContext, query) {
		query.join('page', 'page.id', '=', 'blockcontainer.pageid');
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
			tableName: 'blockcontainer',
			constructor: function() {
				Database.Model.apply(this, arguments);
				this.on("fetching", Auid.Fetching(authContext, filter, ['id', 'pageid', 'blockcontainerdefid', 'client.id', 'site.id', 'siteversion.id'], skipFilter));
				this.on("fetched", Auid.Fetched(authContext, filter, ['id', 'pageid', 'blockcontainerdefid'], skipFilter));
				this.on("saving", Auid.Saving(authContext, filter, ['id', 'pageid', 'blockcontainerdefid'], skipFilter));
				this.on("saving", ModelEvents.PurgeRelatedBeforeSaving(['BlockContainerDef']));
				this.on("destroying", Auid.Destroying(authContext, filter, ['id'], skipFilter));
			},
			Page: function() {
				return this.belongsTo(Page.Model(authContext, skipFilter), 'pageid');
			},
			Site: function() {
				return this.belongsTo(Site.Model(authContext, skipFilter), 'siteid')
							.through(SiteVersion.Model(authContext, skipFilter), 'siteversionid')
							.through(Page.Model(authContext, skipFilter), 'pageid');
			},
			Client: function() {
				return this.belongsTo(Client.Model(authContext, skipFilter), 'clientid')
							.through(Site.Model(authContext, skipFilter), 'siteid')
							.through(SiteVersion.Model(authContext, skipFilter), 'siteversionid')
							.through(Page.Model(authContext, skipFilter), 'pageid');
			},
			BlockContainerDef: function() {
				return this.belongsTo(BlockContainerDef.Model(authContext, skipFilter), 'blockcontainerdefid');
			}
		});
	};

	var collection = function(authContext, skipFilter) {
		return Database.Bookshelf.Collection.extend({
			model: model(authContext, skipFilter)
		}).forge()
		.on("fetching", Auid.Fetching(authContext, filter, ['id', 'blockcontainerdefid', 'pageid', 'client.id', 'site.id', 'siteversion.id'], skipFilter))
		.on("fetched", Auid.Fetched(authContext, filter, ['id', 'blockcontainerdefid', 'pageid'], skipFilter))
		.on("saving", Auid.Saving(authContext, filter, ['id', 'blockcontainerdefid', 'pageid'], skipFilter))
		.on("saving", ModelEvents.PurgeRelatedBeforeSaving(['BlockContainerDef']))
		.on("destroying", Auid.Destroying(authContext, filter, ['id'], skipFilter));
	};
	
	module.exports = { Model: model, Collection: collection };
})();