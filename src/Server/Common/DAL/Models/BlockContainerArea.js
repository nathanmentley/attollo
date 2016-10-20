(function () {
	var Auid = require("../Core/Auid");
	var Database = require("../Core/Database");
	var ModelEvents = require("../Core/ModelEvents");
    
	var Page = require("./Page");
	var Site = require("./Site");
	var Client = require("./Client");
	var BlockContainer = require("./BlockContainer");
	var BlockContainerAreaDef = require("./BlockContainerAreaDef");

	var filter = function(authContext, query) {
		query.join('blockcontainer', 'blockcontainer.id', '=', 'blockcontainerarea.blockcontainerid');
		query.join('page', 'page.id', '=', 'blockcontainer.pageid');
		query.join('site', 'site.id', '=', 'page.siteid');
		query.join('client', 'client.id', '=', 'site.clientid');
		query.where('client.id', '=', authContext.ClientID);

		if(authContext.SiteID) {
			query.where('site.id', '=', authContext.SiteID);
		}
	};

	var model = function(authContext, skipFilter) {
		return Database.Model.extend({
			tableName: 'blockcontainerarea',
			constructor: function() {
				Database.Model.apply(this, arguments);
				this.on("fetching", Auid.Fetching(authContext, filter, ['id', 'pageid', 'blockcontaineraredefid', 'client.id', 'site.id'], skipFilter));
				this.on("fetched", Auid.Fetched(authContext, filter, ['id', 'pageid', 'blockcontaineraredefid'], skipFilter));
				this.on("saving", Auid.Saving(authContext, filter, ['id', 'pageid', 'blockcontaineraredefid'], skipFilter));
				this.on("saving", ModelEvents.PurgeRelatedBeforeSaving(['BlockContainerAreaDef']));
				this.on("destroying", Auid.Destroying(authContext, filter, ['id'], skipFilter));
			},
			BlockContainer: function() {
				return this.belongsTo(BlockContainer.Model(authContext, skipFilter), 'blockcontainerid');
			},
			Page: function() {
				return this.belongsTo(Page.Model(authContext, skipFilter), 'pageid')
							.through(BlockContainer.Model(authContext, skipFilter), 'blockcontainerid');
			},
			Site: function() {
				return this.belongsTo(Site.Model(authContext, skipFilter), 'siteid')
							.through(Page.Model(authContext, skipFilter), 'pageid')
							.through(BlockContainer.Model(authContext, skipFilter), 'blockcontainerid');
			},
			Client: function() {
				return this.belongsTo(Client.Model(authContext, skipFilter), 'clientid')
							.through(Site.Model(authContext, skipFilter), 'siteid')
							.through(Page.Model(authContext, skipFilter), 'pageid')
							.through(BlockContainer.Model(authContext, skipFilter), 'blockcontainerid');
			},
			BlockContainerAreaDef: function() {
				return this.belongsTo(BlockContainerDef.Model(authContext, skipFilter), 'blockcontaineraredefid');
			}
		});
	};

	var collection = function(authContext, skipFilter) {
		return Database.Bookshelf.Collection.extend({
			model: model(authContext, skipFilter)
		}).forge()
		.on("fetching", Auid.Fetching(authContext, filter, ['id', 'blockcontaineraredefid', 'pageid', 'client.id', 'site.id'], skipFilter))
		.on("fetched", Auid.Fetched(authContext, filter, ['id', 'blockcontaineraredefid', 'pageid'], skipFilter))
		.on("saving", Auid.Saving(authContext, filter, ['id', 'blockcontaineraredefid', 'pageid'], skipFilter))
		.on("saving", ModelEvents.PurgeRelatedBeforeSaving(['BlockContainerAreaDef']))
		.on("destroying", Auid.Destroying(authContext, filter, ['id'], skipFilter));
	};
	
	module.exports = { Model: model, Collection: collection };
})();