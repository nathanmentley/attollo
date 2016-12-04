(function () {
	import Auid from "../Core/Auid";
	import Database from "../Core/Database";
	import ModelEvents from "../Core/ModelEvents";

	import PluginDef from "./PluginDef";
	import PluginDefLogicDef from "./PluginDefLogicDef";
	import PluginDefLogicTarget from "./PluginDefLogicTarget";

	var filter = function(authContext, query) {
		if(authContext.ClientID) {
		}

		if(authContext.SiteID) {
		}
		
		if(authContext.SiteVersionID) {
		}
	};

	var tableName = 'plugindeflogic';
	var model = function(authContext, skipFilter) {
		return Database.Model.extend({
			tableName: tableName,
			constructor: function() {
				Database.Model.apply(this, arguments);
				this.on("fetching", Auid.Fetching(authContext, filter, skipFilter));
				this.on("fetched", Auid.Fetched(authContext, filter, skipFilter));
				this.on("saving", Auid.Saving(authContext, filter, skipFilter));
				this.on("destroying", Auid.Destroying(authContext, filter, skipFilter));
				this.on("created", ModelEvents.AuditCreated(authContext, tableName));
				this.on("updating", ModelEvents.AuditUpdating(authContext, tableName));
				this.on("destroying", ModelEvents.AuditDestroying(authContext, tableName));
			},
			PluginDef: function() {
				return this.belongsTo(PluginDef.Model(authContext, skipFilter), 'plugindefid');
			},
			PluginDefLogicDef: function() {
				return this.belongsTo(PluginDefLogicDef.Model(authContext, skipFilter), 'plugindeflogicdefid');
			},
			PluginDefLogicTarget: function() {
				return this.belongsTo(PluginDefLogicTarget.Model(authContext, skipFilter), 'plugindeflogictargetid');
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
		.on("destroying", Auid.Destroying(authContext, filter, skipFilter))
		.on("created", ModelEvents.AuditCreated(authContext, tableName))
		.on("updating", ModelEvents.AuditUpdating(authContext, tableName))
		.on("destroying", ModelEvents.AuditDestroying(authContext, tableName));
	};
	
	module.exports = { Model: model, Collection: collection };
})();