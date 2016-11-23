(function () {
	var Auid = require("../Core/Auid");
	var Database = require("../Core/Database");
	var ModelEvents = require("../Core/ModelEvents");

	var Client = require("./Client");
	var Role = require("./Role");
	var UserPermission = require("./UserPermission");

	var filter = function(authContext, query) {
		if(authContext.ClientID) {
			query.where('clientid', '=', authContext.ClientID);
		}

		if(authContext.SiteID) {
		}
		
		if(authContext.SiteVersionID) {
		}
	};

	var model = function(authContext, skipFilter) {
		return Database.Model.extend({
			tableName: 'admin',
			hidden: ['password'],
			constructor: function() {
				Database.Model.apply(this, arguments);
				this.on("fetching", Auid.Fetching(authContext, filter, skipFilter));
				this.on("fetched", Auid.Fetched(authContext, filter, skipFilter));
				this.on("saving", Auid.Saving(authContext, filter, skipFilter));
				this.on("destroying", Auid.Destroying(authContext, filter, skipFilter));
				this.on("creating", ModelEvents.AuditCreating(authContext));
				this.on("updating", ModelEvents.AuditUpdating(authContext));
				this.on("destroying", ModelEvents.AuditDestroying(authContext));
			},
			Client: function() {
				return this.belongsTo(Client.Model(authContext, skipFilter), 'clientid');
			},
			Role: function() {
				return this.belongsTo(Role.Model(authContext, skipFilter), 'roleid');
			},
			UserPermissions: function() {
				return this.hasMany(UserPermission.Model(authContext, skipFilter), 'adminid');
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
		.on("creating", ModelEvents.AuditCreating(authContext))
		.on("updating", ModelEvents.AuditUpdating(authContext))
		.on("destroying", ModelEvents.AuditDestroying(authContext));
	};
	
	module.exports = { Model: model, Collection: collection };
})();