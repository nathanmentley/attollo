(function () {
	var Auid = require("../Core/Auid");
	var Database = require("../Core/Database");
	var ModelEvents = require("../Core/ModelEvents");

	var Page = require("./Page");
	var SiteVersion = require("./SiteVersion");
	var Site = require("./Site");
	var Client = require("./Client");
	var BlockContainer = require("./BlockContainer");
	var BlockContainerArea = require("./BlockContainerArea");
	var BlockContainerAreaDef = require("./BlockContainerAreaDef");
	var BlockDef = require("./BlockDef");
	var BlockTemplateDef = require("./BlockTemplateDef");

	var filter = function(authContext, query) {
		query.join('blockcontainerarea', 'blockcontainerarea.id', '=', 'block.blockcontainerareaid');
		query.join('blockcontainer', 'blockcontainer.id', '=', 'blockcontainerarea.blockcontainerid');
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
			tableName: 'block',
			constructor: function() {
				Database.Model.apply(this, arguments);
				this.on("fetching", Auid.Fetching(authContext, filter, ['id', 'blockcontainerareaid', 'blockdefid', 'blocktemplatedefid', 'client.id', 'site.id', 'siteversion.id', 'blockcontainer.id'], skipFilter));
				this.on("fetched", Auid.Fetched(authContext, filter, ['id', 'blockcontainerareaid', 'blockdefid', 'blocktemplatedefid'], skipFilter));
				this.on("saving", Auid.Saving(authContext, filter, ['id', 'blockcontainerareaid', 'blockdefid', 'blocktemplatedefid'], skipFilter));
				this.on("saving", ModelEvents.PurgeRelatedBeforeSaving(['BlockDef', 'BlockContainerArea', 'BlockTemplateDef']));
				this.on("destroying", Auid.Destroying(authContext, filter, ['id'], skipFilter));
			},
			BlockContainerArea: function() {
				return this.belongsTo(BlockContainerArea.Model(authContext, skipFilter), 'blockcontainerareaid');
			},
			BlockContainerAreaDef: function() {
				return this.belongsTo(BlockContainerAreaDef.Model(authContext, skipFilter), 'blockcontainerareadefid')
							.through(BlockContainerArea.Model(authContext, skipFilter), 'blockcontainerareaid');
			},
			BlockContainer: function() {
				return this.belongsTo(BlockContainer.Model(authContext, skipFilter), 'blockcontainerid')
							.through(BlockContainerArea.Model(authContext, skipFilter), 'blockcontainerareaid');
			},
			Page: function() {
				return this.belongsTo(Page.Model(authContext, skipFilter), 'pageid')
							.through(BlockContainer.Model(authContext, skipFilter), 'blockcontainerid')
							.through(BlockContainerArea.Model(authContext, skipFilter), 'blockcontainerareaid');
			},
			Site: function() {
				return this.belongsTo(Site.Model(authContext, skipFilter), 'siteid')
							.through(SiteVersion.Model(authContext, skipFilter), 'siteversionid')
							.through(Page.Model(authContext, skipFilter), 'pageid')
							.through(BlockContainer.Model(authContext, skipFilter), 'blockcontainerid')
							.through(BlockContainerArea.Model(authContext, skipFilter), 'blockcontainerareaid');
			},
			Client: function() {
				return this.belongsTo(Client.Model(authContext, skipFilter), 'clientid')
							.through(Site.Model(authContext, skipFilter), 'siteid')
							.through(SiteVersion.Model(authContext, skipFilter), 'siteversionid')
							.through(Page.Model(authContext, skipFilter), 'pageid')
							.through(BlockContainer.Model(authContext, skipFilter), 'blockcontainerid')
							.through(BlockContainerArea.Model(authContext, skipFilter), 'blockcontainerareaid');
			},
			BlockDef: function() {
				return this.belongsTo(BlockDef.Model(authContext, skipFilter), 'blockdefid');
			},
			BlockTemplateDef: function() {
				return this.belongsTo(BlockTemplateDef.Model(authContext, skipFilter), 'blocktemplatedefid');
			}
		});
	};

	var collection = function(authContext, skipFilter) {
		return Database.Bookshelf.Collection.extend({
			model: model(authContext, skipFilter)
		}).forge()
		.on("fetching", Auid.Fetching(authContext, filter, ['id', 'blockdefid', 'blockcontainerareaid', 'blocktemplatedefid', 'client.id', 'site.id', 'siteversion.id', 'blockcontainer.id'], skipFilter))
		.on("fetched", Auid.Fetched(authContext, filter, ['id', 'blockdefid', 'blockcontainerareaid', 'blocktemplatedefid'], skipFilter))
		.on("saving", Auid.Saving(authContext, filter, ['id', 'blockdefid', 'blockcontainerareaid', 'blocktemplatedefid'], skipFilter))
		.on("saving", ModelEvents.PurgeRelatedBeforeSaving(['BlockDef', 'BlockContainerArea', 'BlockTemplateDef']))
		.on("destroying", Auid.Destroying(authContext, filter, ['id'], skipFilter));
	};
	
	module.exports = { Model: model, Collection: collection };
})();