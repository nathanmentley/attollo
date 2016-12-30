import Auid from "../Core/Auid";
import BaseModel from "../Core/BaseModel";
import Database from "../Core/Database";

import Client from "./Client";
import Role from "./Role";
import UserPermission from "./UserPermission";

	var filter = function(authContext, query) {
		if(authContext.ClientID) {
			query.where('clientid', '=', authContext.ClientID);
		}

		if(authContext.SiteID) {
		}
		
		if(authContext.SiteVersionID) {
		}
	};

	var tableName = 'admin';
	var model = function(authContext, skipFilter) {
		return Database.Bookshelf.Model.extend({
			tableName: tableName,
			hidden: ['password'],
			constructor: function() {
				Database.Bookshelf.Model.apply(this, arguments);
				this.on("fetching", Auid.Fetching(authContext, filter, skipFilter));
				this.on("fetched", Auid.Fetched(authContext, filter, skipFilter));
				this.on("saving", Auid.Saving(authContext, filter, skipFilter));
				this.on("destroying", Auid.Destroying(authContext, filter, skipFilter));
				this.on("created", ModelEvents.AuditCreated(authContext, tableName));
				this.on("updating", ModelEvents.AuditUpdating(authContext, tableName));
				this.on("destroying", ModelEvents.AuditDestroying(authContext, tableName));
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
	
class ModelClass extends BaseModel {
    TableName() {
        return tableName;
    }

    Filter(authContext, query) {
		filter(authContext, query);
    }

    Relations(authContext, skipFilter) {
        return {

		};
    }
}

export default new ModelClass();