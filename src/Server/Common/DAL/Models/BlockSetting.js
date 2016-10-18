(function () {
	var Auid = require("../Core/Auid");
	var Database = require("../Core/Database");
	var ModelEvents = require("../Core/ModelEvents");

	var Page = require("./Page");
	var Site = require("./Site");
	var Client = require("./Client");
	var Block = require("./Block");
	var BlockSettingDef = require("./BlockSettingDef");

	var filter = function(authContext, query) {
		query.join('block', 'block.id', '=', 'blocksetting.blockid');
		query.join('page', 'page.id', '=', 'block.pageid');
		query.join('site', 'site.id', '=', 'page.siteid');
		query.join('client', 'client.id', '=', 'site.clientid');
		query.where('client.id', '=', authContext.ClientID);

		if(authContext.SiteID) {
			query.where('site.id', '=', authContext.SiteID);
		}
	};

	var model = function(authContext, skipFilter) {
		return Database.Model.extend({
			tableName: 'blocksetting',
			constructor: function() {
				Database.Model.apply(this, arguments);
				this.on("fetching", Auid.Fetching(authContext, filter, ['id', 'pageid', 'blockid', 'blocksettingdefid', 'client.id', 'site.id'], skipFilter));
				this.on("fetched", Auid.Fetched(authContext, filter, ['id', 'pageid', 'blockid', 'blocksettingdefid'], skipFilter));
				this.on("saving", Auid.Saving(authContext, filter, ['id', 'pageid', 'blockid', 'blocksettingdefid'], skipFilter));
				this.on("destroying", Auid.Destroying(authContext, filter, ['id'], skipFilter));
			},
			Block: function() {
				return this.belongsTo(Block.Model(authContext, skipFilter), 'blockid');
			},
			Page: function() {
				return this.belongsTo(Page.Model(authContext, skipFilter), 'pageid')
							.through(Block.Model(authContext, skipFilter), 'blockid');
			},
			Site: function() {
				return this.belongsTo(Site.Model(authContext, skipFilter), 'siteid')
							.through(Page.Model(authContext, skipFilter), 'pageid')
							.through(Block.Model(authContext, skipFilter), 'blockid');
			},
			Client: function() {
				return this.belongsTo(Client.Model(authContext, skipFilter), 'clientid')
							.through(Site.Model(authContext, skipFilter), 'siteid')
							.through(Page.Model(authContext, skipFilter), 'pageid')
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
		.on("fetching", Auid.Fetching(authContext, filter, ['id', 'blockid', 'blocksettingdefid', 'pageid', 'client.id', 'site.id'], skipFilter))
		.on("fetched", Auid.Fetched(authContext, filter, ['id', 'blockid', 'blocksettingdefid', 'pageid'], skipFilter))
		.on("saving", Auid.Saving(authContext, filter, ['id', 'blockid', 'blocksettingdefid', 'pageid'], skipFilter))
		.on("destroying", Auid.Destroying(authContext, filter, ['id'], skipFilter));
	};
	
	module.exports = { Model: model, Collection: collection };
})();