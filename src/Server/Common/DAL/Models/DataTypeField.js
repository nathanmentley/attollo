(function () {
	var Auid = require("../Core/Auid");
	var Database = require("../Core/Database");
	var ModelEvents = require("../Core/ModelEvents");

	var DataType = require("./DataType");
	var DataTypeFieldDef = require("./DataTypeFieldDef");

	var filter = function(authContext, query) {
		if(authContext.ClientID) {
			var subQuery = Database.Knex.select('clientid').from('datatype');

			query.whereRaw(
				'(' + subQuery + ' where datatype.id = datatypefield.datatypeid) = ' + Auid.Decode(authContext.ClientID)
			);
		}

		if(authContext.SiteID) {
		}
		
		if(authContext.SiteVersionID) {
		}
	};

	var tableName = 'datatypefield';
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
			DataType: function() {
				return this.belongsTo(DataType.Model(authContext, skipFilter), 'datatypeid');
			},
			DataTypeFieldDef: function() {
				return this.belongsTo(DataTypeFieldDef.Model(authContext, skipFilter), 'datatypefielddefid');
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