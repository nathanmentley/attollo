(function () {
	import Auid from "../Core/Auid";
	import Database from "../Core/Database";
	import ModelEvents from "../Core/ModelEvents";

	import Page from "./Page";
	import SiteVersion from "./SiteVersion";
	import Site from "./Site";
	import Client from "./Client";
	import BlockCssRule from "./BlockCssRule";
	import BlockContainer from "./BlockContainer";
	import BlockContainerArea from "./BlockContainerArea";
	import BlockContainerAreaDef from "./BlockContainerAreaDef";
	import BlockDef from "./BlockDef";
	import BlockTemplateDef from "./BlockTemplateDef";

	var filter = function(authContext, query) {
		if(authContext.ClientID) {
			var subQuery = Database.Knex.select('clientid').from('site')
				.leftJoin('siteversion', 'site.id', '=', 'siteversion.siteid')
				.leftJoin('page', 'siteversion.id', '=', 'page.siteversionid')
				.leftJoin('blockcontainer', 'blockcontainer.pageid', '=', 'page.id')
				.leftJoin('blockcontainerarea', 'blockcontainerarea.blockcontainerid', '=', 'blockcontainer.id');

			query.whereRaw(
				'(' + subQuery + ' where blockcontainerarea.id = block.blockcontainerareaid) = ' + Auid.Decode(authContext.ClientID)
			);
		}

		if(authContext.SiteID) {
			var subQuery = Database.Knex.select('siteid').from('siteversion')
				.leftJoin('page', 'siteversion.id', '=', 'page.siteversionid')
				.leftJoin('blockcontainer', 'blockcontainer.pageid', '=', 'page.id')
				.leftJoin('blockcontainerarea', 'blockcontainerarea.blockcontainerid', '=', 'blockcontainer.id');

			query.whereRaw(
				'(' + subQuery + ' where blockcontainerarea.id = block.blockcontainerareaid) = ' + Auid.Decode(authContext.SiteID)
			);
		}
		
		if(authContext.SiteVersionID) {
			var subQuery = Database.Knex.select('siteversionid').from('page')
				.leftJoin('blockcontainer', 'blockcontainer.pageid', '=', 'page.id')
				.leftJoin('blockcontainerarea', 'blockcontainerarea.blockcontainerid', '=', 'blockcontainer.id');

			query.whereRaw(
				'(' + subQuery + ' where blockcontainerarea.id = block.blockcontainerareaid) = ' + Auid.Decode(authContext.SiteVersionID)
			);
		}
	};

	var tableName = 'block';
	var model = function(authContext, skipFilter) {
		return Database.Model.extend({
			tableName: tableName,
			constructor: function() {
				Database.Model.apply(this, arguments);
				this.on("fetching", Auid.Fetching(authContext, filter, skipFilter));
				this.on("fetched", Auid.Fetched(authContext, filter, skipFilter));
				this.on("saving", Auid.Saving(authContext, filter, skipFilter));
				this.on("saving", ModelEvents.PurgeRelatedBeforeSaving(['BlockDef', 'BlockContainerArea', 'BlockTemplateDef', 'BlockSettings', 'BlockCssRules']));
				this.on("destroying", Auid.Destroying(authContext, filter, skipFilter));
				this.on("created", ModelEvents.AuditCreated(authContext, tableName));
				this.on("updating", ModelEvents.AuditUpdating(authContext, tableName));
				this.on("destroying", ModelEvents.AuditDestroying(authContext, tableName));
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
				import BlockSetting from "./BlockSetting";
				return this.hasMany(BlockSetting.Model(authContext, skipFilter), "blockid");
			},
			BlockCssRules: function() {
				return this.hasMany(BlockCssRule.Model(authContext, skipFilter), 'blockid');
			}
		});
	};

	var collection = function(authContext, skipFilter) {
		return Database.Bookshelf.Collection.extend({
			model: model(authContext, skipFilter)
		}).forge()
		.on("fetching", Auid.Fetching(authContext, filter, skipFilter))
		.on("fetched", Auid.Fetched(authContext, filter, skipFilter))
		.on("saving", Auid.Saving(authContext, filter, skipFilter))
		.on("saving", ModelEvents.PurgeRelatedBeforeSaving(['BlockDef', 'BlockContainerArea', 'BlockTemplateDef', 'BlockSettings', 'BlockCssRules']))
		.on("destroying", Auid.Destroying(authContext, filter, skipFilter))
		.on("created", ModelEvents.AuditCreated(authContext, tableName))
		.on("updating", ModelEvents.AuditUpdating(authContext, tableName))
		.on("destroying", ModelEvents.AuditDestroying(authContext, tableName));
	};
	
	module.exports = { Model: model, Collection: collection };
})();