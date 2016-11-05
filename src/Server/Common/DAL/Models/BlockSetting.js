(function () {
	var Auid = require("../Core/Auid");
	var Database = require("../Core/Database");
	var ModelEvents = require("../Core/ModelEvents");

	var Client = require("./Client");
	var Site = require("./Site");
	var SiteVersion = require("./SiteVersion");
	var Page = require("./Page");
	var BlockContainer = require("./BlockContainer");
	var BlockContainerArea = require("./BlockContainerArea");
	var Block = require("./Block");
	var BlockSettingDef = require("./BlockSettingDef");

	var filter = function(authContext, query) {
		query.join('block', 'block.id', '=', 'blocksetting.blockid');
		query.join('blockcontainerarea', 'blockcontainerarea.id', '=', 'block.blockcontainerareaid');
		query.join('blockcontainer', 'blockcontainer.id', '=', 'blockcontainerarea.blockcontainerid');
		query.join('page', 'page.id', '=', 'block.pageid');
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
			tableName: 'blocksetting',
			constructor: function() {
				Database.Model.apply(this, arguments);
				this.on("fetching", Auid.Fetching(authContext, filter, ['id', 'pageid', 'blockid', 'blockcontainerareaid', 'blockcontainerid', 'blocksettingdefid', 'client.id', 'site.id', 'siteversion.id'], skipFilter));
				this.on("fetched", Auid.Fetched(authContext, filter, ['id', 'pageid', 'blockid', 'blockcontainerareaid', 'blockcontainerid', 'blocksettingdefid'], skipFilter));
				this.on("saving", Auid.Saving(authContext, filter, ['id', 'pageid', 'blockid', 'blockcontainerareaid', 'blockcontainerid', 'blocksettingdefid'], skipFilter));
				this.on("saving", ModelEvents.PurgeRelatedBeforeSaving(['BlockSettingDef']));
				this.on("destroying", Auid.Destroying(authContext, filter, ['id'], skipFilter));
			},
			Block: function() {
				return this.belongsTo(Block.Model(authContext, skipFilter), 'blockid');
			},
			BlockContainerArea: function() {
				return this.belongsTo(BlockContainerArea.Model(authContext, skipFilter), 'blockcontainerareaid')
							.through(Block.Model(authContext, skipFilter), 'blockid');
			},
			BlockContainer: function() {
				return this.belongsTo(BlockContainer.Model(authContext, skipFilter), 'blockcontainerid')
							.through(BlockContainerArea.Model(authContext, skipFilter), 'blockcontainerareaid')
							.through(Block.Model(authContext, skipFilter), 'blockid');
			},
			Page: function() {
				return this.belongsTo(Page.Model(authContext, skipFilter), 'pageid')
							.through(BlockContainer.Model(authContext, skipFilter), 'blockcontainerid')
							.through(BlockContainerArea.Model(authContext, skipFilter), 'blockcontainerareaid')
							.through(Block.Model(authContext, skipFilter), 'blockid');
			},
			Site: function() {
				return this.belongsTo(Site.Model(authContext, skipFilter), 'siteid')
							.through(SiteVersion.Model(authContext, skipFilter), 'siteversionid')
							.through(Page.Model(authContext, skipFilter), 'pageid')
							.through(BlockContainer.Model(authContext, skipFilter), 'blockcontainerid')
							.through(BlockContainerArea.Model(authContext, skipFilter), 'blockcontainerareaid')
							.through(Block.Model(authContext, skipFilter), 'blockid');
			},
			Client: function() {
				return this.belongsTo(Client.Model(authContext, skipFilter), 'clientid')
							.through(Site.Model(authContext, skipFilter), 'siteid')
							.through(SiteVersion.Model(authContext, skipFilter), 'siteversionid')
							.through(Page.Model(authContext, skipFilter), 'pageid')
							.through(BlockContainer.Model(authContext, skipFilter), 'blockcontainerid')
							.through(BlockContainerArea.Model(authContext, skipFilter), 'blockcontainerareaid')
							.through(Block.Model(authContext, skipFilter), 'blockid');
			},
			BlockSettingDef: function() {
				return this.belongsTo(BlockSettingDef.Model(authContext, skipFilter), 'blocksettingdefid');
			}
		});
	};

	var collection = function(authContext, skipFilter) {
		return Database.Bookshelf.Collection.extend({
			model: model(authContext, skipFilter)
		}).forge()
		.on("fetching", Auid.Fetching(authContext, filter, ['id', 'blockid', 'blockcontainerareaid', 'blockcontainerid', 'blocksettingdefid', 'pageid', 'client.id', 'site.id', 'siteversion.id'], skipFilter))
		.on("fetched", Auid.Fetched(authContext, filter, ['id', 'blockid', 'blockcontainerareaid', 'blockcontainerid', 'blocksettingdefid', 'pageid'], skipFilter))
		.on("saving", Auid.Saving(authContext, filter, ['id', 'blockid', 'blockcontainerareaid', 'blockcontainerid', 'blocksettingdefid', 'pageid'], skipFilter))
		.on("saving", ModelEvents.PurgeRelatedBeforeSaving(['BlockSettingDef']))
		.on("destroying", Auid.Destroying(authContext, filter, ['id'], skipFilter));
	};
	
	module.exports = { Model: model, Collection: collection };
})();