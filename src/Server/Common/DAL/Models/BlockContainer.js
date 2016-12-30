import Auid from "../Core/Auid";
import BaseModel from "../Core/BaseModel";
import Database from "../Core/Database";
    
import Page from "./Page";
import SiteVersion from "./SiteVersion";
import Site from "./Site";
import Client from "./Client";
import BlockContainerCssRule from "./BlockContainerCssRule";
import BlockContainerDef from "./BlockContainerDef";
import Block from "./Block";
import BlockContainerArea from "./BlockContainerArea";

class BlockContainer extends BaseModel {
    TableName() {
        return 'blockcontainer';
    }

    Filter(authContext, query) {
		if(authContext.ClientID) {
			var subQuery = Database.Knex.select('clientid').from('site')
				.leftJoin('siteversion', 'site.id', '=', 'siteversion.siteid')
				.leftJoin('page', 'siteversion.id', '=', 'page.siteversionid');

			query.whereRaw(
				'(' + subQuery + ' where page.id = blockcontainer.pageid) = ' + Auid.Decode(authContext.ClientID)
			);
		}

		if(authContext.SiteID) {
			var subQuery = Database.Knex.select('siteid').from('siteversion')
				.leftJoin('page', 'siteversion.id', '=', 'page.siteversionid');
				
			query.whereRaw(
				'(' + subQuery + ' where page.id = blockcontainer.pageid) = ' + Auid.Decode(authContext.SiteID)
			);
		}
		
		if(authContext.SiteVersionID) {
			var subQuery = Database.Knex.select('siteversionid').from('page');
				
			query.whereRaw(
				'(' + subQuery + ' where page.id = blockcontainer.pageid) = ' + Auid.Decode(authContext.SiteVersionID)
			);
		}
    }

    Relations(authContext, skipFilter) {
        return {
			Page: function() {
				return this.belongsTo(Page.Model(authContext, skipFilter), 'pageid');
			},
			Site: function() {
				return this.belongsTo(Site.Model(authContext, skipFilter), 'siteid')
							.through(SiteVersion.Model(authContext, skipFilter), 'siteversionid')
							.through(Page.Model(authContext, skipFilter), 'pageid');
			},
			Client: function() {
				return this.belongsTo(Client.Model(authContext, skipFilter), 'clientid')
							.through(Site.Model(authContext, skipFilter), 'siteid')
							.through(SiteVersion.Model(authContext, skipFilter), 'siteversionid')
							.through(Page.Model(authContext, skipFilter), 'pageid');
			},
			BlockContainerDef: function() {
				return this.belongsTo(BlockContainerDef.Model(authContext, skipFilter), 'blockcontainerdefid');
			},
			BlockContainerAreas: function() {
				return this.hasMany(BlockContainerArea.Model(authContext, skipFilter), 'blockcontainerid');
			},
			Blocks: function() {
				return this.hasMany(Block.Model(authContext, skipFilter), 'blockcontainerareaid')
							.through(BlockContainerArea.Model(authContext, skipFilter), 'blockcontainerid');
			},
			BlockContainerCssRules: function() {
				return this.hasMany(BlockContainerCssRule.Model(authContext, skipFilter), 'blockcontainercssruleid');
			}
		};
    }
}

export default new BlockContainer();