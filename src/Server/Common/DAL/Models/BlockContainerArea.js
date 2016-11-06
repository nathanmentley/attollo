(function () {
	var Auid = require("../Core/Auid");
	var Database = require("../Core/Database");
	var ModelEvents = require("../Core/ModelEvents");
    
	var Page = require("./Page");
	var SiteVersion = require("./SiteVersion");
	var Site = require("./Site");
	var Client = require("./Client");
	var BlockContainer = require("./BlockContainer");
	var BlockContainerAreaDef = require("./BlockContainerAreaDef");

	var filter = function(authContext, query) {
		if(authContext.ClientID) {
			var subQuery = Database.Knex.select('clientid').from('site')
				.leftJoin('siteversion', 'site.id', '=', 'siteversion.siteid')
				.leftJoin('page', 'siteversion.id', '=', 'page.siteversionid')
				.leftJoin('blockcontainer', 'blockcontainer.pageid', '=', 'page.id');

			query.whereRaw(
				'(' + subQuery + ' where blockcontainer.id = blockcontainerarea.blockcontainerid) = ' + authContext.ClientID
			);
		}

		if(authContext.SiteID) {
			var subQuery = Database.Knex.select('siteid').from('siteversion')
				.leftJoin('page', 'siteversion.id', '=', 'page.siteversionid')
				.leftJoin('blockcontainer', 'blockcontainer.pageid', '=', 'page.id');

			query.whereRaw(
				'(' + subQuery + ' where blockcontainer.id = blockcontainerarea.blockcontainerid) = ' + authContext.SiteID
			);
		}
		
		if(authContext.SiteVersionID) {
			var subQuery = Database.Knex.select('siteversionid').from('page')
				.leftJoin('blockcontainer', 'blockcontainer.pageid', '=', 'page.id');

			query.whereRaw(
				'(' + subQuery + ' where blockcontainer.id = blockcontainerarea.blockcontainerid) = ' + authContext.SiteVersionID
			);
		}
	};

	var model = function(authContext, skipFilter) {
		return Database.Model.extend({
			tableName: 'blockcontainerarea',
			constructor: function() {
				Database.Model.apply(this, arguments);
				this.on("fetching", Auid.Fetching(authContext, filter, ['id', 'pageid', 'blockcontainerareadefid', 'blockcontainerid', 'client.id', 'site.id', 'siteversion.id'], skipFilter));
				this.on("fetched", Auid.Fetched(authContext, filter, ['id', 'pageid', 'blockcontainerareadefid', 'blockcontainerid'], skipFilter));
				this.on("saving", Auid.Saving(authContext, filter, ['id', 'pageid', 'blockcontainerareadefid', 'blockcontainerid'], skipFilter));
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
							.through(SiteVersion.Model(authContext, skipFilter), 'siteversionid')
							.through(Page.Model(authContext, skipFilter), 'pageid')
							.through(BlockContainer.Model(authContext, skipFilter), 'blockcontainerid');
			},
			Client: function() {
				return this.belongsTo(Client.Model(authContext, skipFilter), 'clientid')
							.through(Site.Model(authContext, skipFilter), 'siteid')
							.through(SiteVersion.Model(authContext, skipFilter), 'siteversionid')
							.through(Page.Model(authContext, skipFilter), 'pageid')
							.through(BlockContainer.Model(authContext, skipFilter), 'blockcontainerid');
			},
			BlockContainerAreaDef: function() {
				return this.belongsTo(BlockContainerAreaDef.Model(authContext, skipFilter), 'blockcontainerareadefid');
			},
			Blocks: function() {
				var Block = require("./Block");
				
				return this.hasMany(Block.Model(authContext, skipFilter), 'blockcontainerareaid');
			}
		});
	};

	var collection = function(authContext, skipFilter) {
		return Database.Bookshelf.Collection.extend({
			model: model(authContext, skipFilter)
		}).forge()
		.on("fetching", Auid.Fetching(authContext, filter, ['id', 'blockcontainerareadefid', 'blockcontainerid', 'pageid', 'client.id', 'site.id', 'siteversion.id'], skipFilter))
		.on("fetched", Auid.Fetched(authContext, filter, ['id', 'blockcontainerareadefid', 'blockcontainerid', 'pageid'], skipFilter))
		.on("saving", Auid.Saving(authContext, filter, ['id', 'blockcontainerareadefid', 'blockcontainerid', 'pageid'], skipFilter))
		.on("saving", ModelEvents.PurgeRelatedBeforeSaving(['BlockContainerAreaDef']))
		.on("destroying", Auid.Destroying(authContext, filter, ['id'], skipFilter));
	};
	
	module.exports = { Model: model, Collection: collection };
})();