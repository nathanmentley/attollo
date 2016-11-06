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
		if(authContext.ClientID) {
			var subQuery = Database.Knex.select('clientid').from('site')
				.leftJoin('siteversion', 'site.id', '=', 'siteversion.siteid')
				.leftJoin('page', 'siteversion.id', '=', 'page.siteversionid')
				.leftJoin('blockcontainer', 'blockcontainer.pageid', '=', 'page.id')
				.leftJoin('blockcontainerarea', 'blockcontainerarea.blockcontainerid', '=', 'blockcontainer.id');

			query.whereRaw(
				'(' + subQuery + ' where blockcontainerarea.id = block.blockcontainerareaid) = ' + authContext.ClientID
			);
		}

		if(authContext.SiteID) {
			var subQuery = Database.Knex.select('siteid').from('siteversion')
				.leftJoin('page', 'siteversion.id', '=', 'page.siteversionid')
				.leftJoin('blockcontainer', 'blockcontainer.pageid', '=', 'page.id')
				.leftJoin('blockcontainerarea', 'blockcontainerarea.blockcontainerid', '=', 'blockcontainer.id');

			query.whereRaw(
				'(' + subQuery + ' where blockcontainerarea.id = block.blockcontainerareaid) = ' + authContext.SiteID
			);
		}
		
		if(authContext.SiteVersionID) {
			var subQuery = Database.Knex.select('siteversionid').from('page')
				.leftJoin('blockcontainer', 'blockcontainer.pageid', '=', 'page.id')
				.leftJoin('blockcontainerarea', 'blockcontainerarea.blockcontainerid', '=', 'blockcontainer.id');

			query.whereRaw(
				'(' + subQuery + ' where blockcontainerarea.id = block.blockcontainerareaid) = ' + authContext.SiteVersionID
			);
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
				this.on("saving", ModelEvents.PurgeRelatedBeforeSaving(['BlockDef', 'BlockContainerArea', 'BlockTemplateDef', 'BlockSettings']));
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
			},
			BlockSettings: function() {
				var BlockSetting = require("./BlockSetting");
				return this.hasMany(BlockSetting.Model(authContext, skipFilter), "blockid");
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
		.on("saving", ModelEvents.PurgeRelatedBeforeSaving(['BlockDef', 'BlockContainerArea', 'BlockTemplateDef', 'BlockSettings']))
		.on("destroying", Auid.Destroying(authContext, filter, ['id'], skipFilter));
	};
	
	module.exports = { Model: model, Collection: collection };
})();