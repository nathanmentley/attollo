import Auid from "../Core/Auid";
import BaseModel from "../Core/BaseModel";
import Database from "../Core/Database";

import SiteVersion from "./SiteVersion";
import Site from "./Site";
import Client from "./Client";
import PageDef from "./PageDef";

	var filter = function(authContext, query) {
		if(authContext.ClientID) {
			var subQuery = Database.Knex.select('clientid').from('site')
				.leftJoin('siteversion', 'site.id', '=', 'siteversion.siteid');

			query.whereRaw(
				'(' + subQuery + ' where siteversion.id = page.siteversionid) = ' + Auid.Decode(authContext.ClientID)
			);
		}

		if(authContext.SiteID) {
			var subQuery = Database.Knex.select('siteid').from('siteversion');

			query.whereRaw(
				'(' + subQuery + ' where siteversion.id = page.siteversionid) = ' + Auid.Decode(authContext.SiteID)
			);
		}
		
		if(authContext.SiteVersionID) {
			query.where('siteversionid', '=', authContext.SiteVersionID);
		}
	};

	var tableName = 'page';
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
			SiteVersion: function() {
				return this.belongsTo(SiteVersion.Model(authContext, skipFilter), 'siteversionid');
			},
			Site: function() {
				return this.belongsTo(Site.Model(authContext, skipFilter), 'siteid')
							.through(SiteVersion.Model(authContext, skipFilter), 'siteversionid');
			},
			Client: function() {
				return this.belongsTo(Client.Model(authContext, skipFilter), 'clientid')
							.through(Site.Model(authContext, skipFilter), 'siteid')
							.through(SiteVersion.Model(authContext, skipFilter), 'siteversionid');
			},
			PageDef: function() {
				return this.belongsTo(PageDef.Model(authContext, skipFilter), 'pagedefid');
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