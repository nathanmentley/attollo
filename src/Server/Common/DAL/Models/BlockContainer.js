(function () {
	import Auid from "../Core/Auid";
	import Database from "../Core/Database";
	import ModelEvents from "../Core/ModelEvents";
    
	import Page from "./Page";
	import SiteVersion from "./SiteVersion";
	import Site from "./Site";
	import Client from "./Client";
	import BlockContainerCssRule from "./BlockContainerCssRule";
	import BlockContainerDef from "./BlockContainerDef";

	var filter = function(authContext, query) {
		if(authContext.ClientID) {
			var subQuery = Database.Knex.select('clientid').from('site')
				.leftJoin('siteversion', 'site.id', '=', 'siteversion.siteid')
				.leftJoin('page', 'siteversion.id', '=', 'page.siteversionid');

			query.whereRaw(
				'(' + subQuery + ' where page.id = blockcontainer.pageid) = ' + Auid.Decode(authContext.ClientID)
			);
		}

		if(authContext.SiteID) {
			var subQuery = Database.Knex.select('siteid').from('siteversion')
				.leftJoin('page', 'siteversion.id', '=', 'page.siteversionid');
				
			query.whereRaw(
				'(' + subQuery + ' where page.id = blockcontainer.pageid) = ' + Auid.Decode(authContext.SiteID)
			);
		}
		
		if(authContext.SiteVersionID) {
			var subQuery = Database.Knex.select('siteversionid').from('page');
				
			query.whereRaw(
				'(' + subQuery + ' where page.id = blockcontainer.pageid) = ' + Auid.Decode(authContext.SiteVersionID)
			);
		}
	};

	var tableName = 'blockcontainer';
	var model = function(authContext, skipFilter) {
		return Database.Model.extend({
			tableName: tableName,
			constructor: function() {
				Database.Model.apply(this, arguments);
				this.on("fetching", Auid.Fetching(authContext, filter, skipFilter));
				this.on("fetched", Auid.Fetched(authContext, filter, skipFilter));
				this.on("saving", Auid.Saving(authContext, filter, skipFilter));
				this.on("saving", ModelEvents.PurgeRelatedBeforeSaving(['BlockContainerDef', 'BlockContainerAreas']));
				this.on("destroying", Auid.Destroying(authContext, filter, skipFilter));
				this.on("created", ModelEvents.AuditCreated(authContext, tableName));
				this.on("updating", ModelEvents.AuditUpdating(authContext, tableName));
				this.on("destroying", ModelEvents.AuditDestroying(authContext, tableName));
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
			},
			BlockContainerAreas: function() {
				import BlockContainerArea from "./BlockContainerArea";

				return this.hasMany(BlockContainerArea.Model(authContext, skipFilter), 'blockcontainerid');
			},
			Blocks: function() {
				import Block from "./Block";
				import BlockContainerArea from "./BlockContainerArea";
				
				return this.hasMany(Block.Model(authContext, skipFilter), 'blockcontainerareaid')
							.through(BlockContainerArea.Model(authContext, skipFilter), 'blockcontainerid');
			},
			BlockContainerCssRules: function() {
				return this.hasMany(BlockContainerCssRule.Model(authContext, skipFilter), 'blockcontainercssruleid');
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
		.on("saving", ModelEvents.PurgeRelatedBeforeSaving(['BlockContainerDef', 'BlockContainerAreas']))
		.on("destroying", Auid.Destroying(authContext, filter, skipFilter))
		.on("created", ModelEvents.AuditCreated(authContext, tableName))
		.on("updating", ModelEvents.AuditUpdating(authContext, tableName))
		.on("destroying", ModelEvents.AuditDestroying(authContext, tableName));
	};
	
	module.exports = { Model: model, Collection: collection };
})();