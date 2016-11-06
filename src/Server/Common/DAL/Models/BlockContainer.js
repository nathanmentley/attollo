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
		if(authContext.ClientID) {
			var subQuery = Database.Knex.select('clientid').from('site')
				.leftJoin('siteversion', 'site.id', '=', 'siteversion.siteid')
				.leftJoin('page', 'siteversion.id', '=', 'page.siteversionid');

			query.whereRaw(
				'(' + subQuery + ' where page.id = blockcontainer.pageid) = ' + authContext.ClientID
			);
		}

		if(authContext.SiteID) {
			var subQuery = Database.Knex.select('siteid').from('siteversion')
				.leftJoin('page', 'siteversion.id', '=', 'page.siteversionid');
				
			query.whereRaw(
				'(' + subQuery + ' where page.id = blockcontainer.pageid) = ' + authContext.SiteID
			);
		}
		
		if(authContext.SiteVersionID) {
			var subQuery = Database.Knex.select('siteversionid').from('page');
				
			query.whereRaw(
				'(' + subQuery + ' where page.id = blockcontainer.pageid) = ' + authContext.SiteVersionID
			);
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
				this.on("saving", ModelEvents.PurgeRelatedBeforeSaving(['BlockContainerDef', 'BlockContainerAreas']));
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
			},
			BlockContainerAreas: function() {
				var BlockContainerArea = require("./BlockContainerArea");

				return this.hasMany(BlockContainerArea.Model(authContext, skipFilter), 'blockcontainerid');
			},
			Blocks: function() {
				var Block = require("./Block");
				var BlockContainerArea = require("./BlockContainerArea");
				
				return this.hasMany(Block.Model(authContext, skipFilter), 'blockcontainerareaid')
							.through(BlockContainerArea.Model(authContext, skipFilter), 'blockcontainerid');
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
		.on("saving", ModelEvents.PurgeRelatedBeforeSaving(['BlockContainerDef', 'BlockContainerAreas']))
		.on("destroying", Auid.Destroying(authContext, filter, ['id'], skipFilter));
	};
	
	module.exports = { Model: model, Collection: collection };
})();