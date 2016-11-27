(function () {
	var Auid = require("../Core/Auid");
	var Database = require("../Core/Database");
	var ModelEvents = require("../Core/ModelEvents");

	var DataTypeDef = require("./DataTypeDef");

	var filter = function(authContext, query) {
		if(authContext.ClientID) {
			query.where('clientid', '=', authContext.ClientID);
		}

		if(authContext.SiteID) {
		}
		
		if(authContext.SiteVersionID) {
		}
	};

	var tableName = 'datatype';
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
			DataTypeDef: function() {
				return this.belongsTo(DataTypeDef.Model(authContext, skipFilter), 'datatypedefid');
			},
			DataTypeFields: function () {
				var DataTypeField = require("./DataTypeField");
				return this.hasMany(DataTypeField.Model(authContext, skipFilter), 'datatypeid');
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