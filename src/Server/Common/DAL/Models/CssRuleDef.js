import Auid from "../Core/Auid";
import BaseModel from "../Core/BaseModel";
import Database from "../Core/Database";

import CssRuleDefType from "./CssRuleDefType";
import CssRuleDefGroup from "./CssRuleDefGroup";

	var filter = function(authContext, query) {
	};

	var tableName = 'cssruledef';
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
			CssRuleDefType: function() {
				return this.belongsTo(CssRuleDefType.Model(authContext, skipFilter), 'cssruledeftypeid');
			},
			CssRuleDefGroup: function() {
				return this.belongsTo(CssRuleDefGroup.Model(authContext, skipFilter), 'cssruledefgroupid');
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