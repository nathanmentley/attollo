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
		if(authContext.ClientID) {
			var subQuery = Database.Knex.select('clientid').from('site')
				.leftJoin('siteversion', 'site.id', '=', 'siteversion.siteid')
				.leftJoin('page', 'siteversion.id', '=', 'page.siteversionid')
				.leftJoin('blockcontainer', 'blockcontainer.pageid', '=', 'page.id')
				.leftJoin('blockcontainerarea', 'blockcontainerarea.blockcontainerid', '=', 'blockcontainer.id')
				.leftJoin('block', 'block.blockcontainerareaid', '=', 'blockcontainerarea.id');

			query.whereRaw(
				'(' + subQuery + ' where block.id = blocksetting.blockid) = ' + authContext.ClientID
			);
		}

		if(authContext.SiteID) {
			var subQuery = Database.Knex.select('siteid').from('siteversion')
				.leftJoin('page', 'siteversion.id', '=', 'page.siteversionid')
				.leftJoin('blockcontainer', 'blockcontainer.pageid', '=', 'page.id')
				.leftJoin('blockcontainerarea', 'blockcontainerarea.blockcontainerid', '=', 'blockcontainer.id')
				.leftJoin('block', 'block.blockcontainerareaid', '=', 'blockcontainerarea.id');

			query.whereRaw(
				'(' + subQuery + ' where block.id = blocksetting.blockid) = ' + authContext.SiteID
			);
		}
		
		if(authContext.SiteVersionID) {
			var subQuery = Database.Knex.select('siteversionid').from('page')
				.leftJoin('blockcontainer', 'blockcontainer.pageid', '=', 'page.id')
				.leftJoin('blockcontainerarea', 'blockcontainerarea.blockcontainerid', '=', 'blockcontainer.id')
				.leftJoin('block', 'block.blockcontainerareaid', '=', 'blockcontainerarea.id');

			query.whereRaw(
				'(' + subQuery + ' where block.id = blocksetting.blockid) = ' + authContext.SiteVersionID
			);
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