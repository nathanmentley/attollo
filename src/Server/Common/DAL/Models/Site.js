(function () {
	var Auid = require("../Core/Auid");
	var Database = require("../Core/Database");
	var ModelEvents = require("../Core/ModelEvents");

	var Client = require("./Client");
	var Theme = require("./Theme");

	var filter = function(authContext, query) {
		if(authContext.ClientID) {
			query.where('clientid', '=', authContext.ClientID);
		}

		if(authContext.SiteID) {
			query.where('id', '=', authContext.SiteID);
		}
		
		if(authContext.SiteVersionID) {
		}
	};

	var tableName = 'site';
	var model = function(authContext, skipFilter) {
		return Database.Model.extend({
			tableName: 'site',
			constructor: function() {
				Database.Model.apply(this, arguments);
				this.on("fetching", Auid.Fetching(authContext, filter, skipFilter));
				this.on("fetched", Auid.Fetched(authContext, filter, skipFilter));
				this.on("saving", Auid.Saving(authContext, filter, skipFilter));
				this.on("saving", ModelEvents.PurgeRelatedBeforeSaving(['Theme']));
				this.on("destroying", Auid.Destroying(authContext, filter, skipFilter));
				this.on("creating", ModelEvents.AuditCreating(authContext, tableName));
				this.on("updating", ModelEvents.AuditUpdating(authContext, tableName));
				this.on("destroying", ModelEvents.AuditDestroying(authContext, tableName));
			},
			Client: function() {
				return this.belongsTo(Client.Model(authContext, skipFilter), 'clientid');
			},
			Theme: function() {
				return this.belongsTo(Theme.Model(authContext, skipFilter), 'themeid');
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
		.on("saving", ModelEvents.PurgeRelatedBeforeSaving(['Theme']))
		.on("destroying", Auid.Destroying(authContext, filter, skipFilter))
		.on("creating", ModelEvents.AuditCreating(authContext, tableName))
		.on("updating", ModelEvents.AuditUpdating(authContext, tableName))
		.on("destroying", ModelEvents.AuditDestroying(authContext, tableName));
	};
	
	module.exports = { Model: model, Collection: collection };
})();