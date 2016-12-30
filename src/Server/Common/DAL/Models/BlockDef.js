import Auid from "../Core/Auid";
import BaseModel from "../Core/BaseModel";
import Database from "../Core/Database";

import PageDef from "./PageDef";



import BlockDefDataRequest from "./BlockDefDataRequest";
import BlockDefFunction from "./BlockDefFunction";
import BlockSettingDef from "./BlockSettingDef";

	var filter = function(authContext, query) {
		if(authContext.PluginDefIds) {
			query.where('plugindefid', 'in', authContext.PluginDefIds);
		}
	};

	var tableName = 'blockdef';
	var model = function(authContext, skipFilter) {
		return Database.Bookshelf.Model.extend({
			tableName: tableName,
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
			PageDef: function() {
				return this.belongsTo(PageDef.Model(authContext, skipFilter), 'pagedefid');
			},
			BlockSettingDefs: function() {
				return this.hasMany(BlockSettingDef.Model(authContext, skipFilter), "blockdefid");
			},
			BlockDefDataRequests: function() {
				return this.hasMany(BlockDefDataRequest.Model(authContext, skipFilter), 'blockdefid');
			},
			BlockDefFunctions: function() {
				return this.hasMany(BlockDefFunction.Model(authContext, skipFilter), 'blockdefid');
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