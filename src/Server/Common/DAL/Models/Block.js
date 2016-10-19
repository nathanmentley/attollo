(function () {
	var Auid = require("../Core/Auid");
	var Database = require("../Core/Database");
	var ModelEvents = require("../Core/ModelEvents");

	var Page = require("./Page");
	var Site = require("./Site");
	var Client = require("./Client");
	var BlockContainer = require("./BlockContainer");
	var BlockDef = require("./BlockDef");

	var filter = function(authContext, query) {
		query.join('blockcontainer', 'blockcontainer.id', '=', 'block.blockcontainerid');
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
			tableName: 'block',
			constructor: function() {
				Database.Model.apply(this, arguments);
				this.on("fetching", Auid.Fetching(authContext, filter, ['id', 'blockcontainerid', 'blockdefid', 'client.id', 'site.id'], skipFilter));
				this.on("fetched", Auid.Fetched(authContext, filter, ['id', 'blockcontainerid', 'blockdefid'], skipFilter));
				this.on("saving", Auid.Saving(authContext, filter, ['id', 'blockcontainerid', 'blockdefid'], skipFilter));
				this.on("saving", ModelEvents.PurgeRelatedBeforeSaving(['BlockDef']));
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
			BlockDef: function() {
				return this.belongsTo(BlockDef.Model(authContext, skipFilter), 'blockdefid');
			}
		});
	};

	var collection = function(authContext, skipFilter) {
		return Database.Bookshelf.Collection.extend({
			model: model(authContext, skipFilter)
		}).forge()
		.on("fetching", Auid.Fetching(authContext, filter, ['id', 'blockdefid', 'blockcontainerid', 'client.id', 'site.id'], skipFilter))
		.on("fetched", Auid.Fetched(authContext, filter, ['id', 'blockdefid', 'blockcontainerid'], skipFilter))
		.on("saving", Auid.Saving(authContext, filter, ['id', 'blockdefid', 'blockcontainerid'], skipFilter))
		.on("saving", ModelEvents.PurgeRelatedBeforeSaving(['BlockDef']))
		.on("destroying", Auid.Destroying(authContext, filter, ['id'], skipFilter));
	};
	
	module.exports = { Model: model, Collection: collection };
})();