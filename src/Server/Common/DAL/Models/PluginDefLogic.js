import Auid from "../Core/Auid";
import BaseModel from "../Core/BaseModel";
import Database from "../Core/Database";

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