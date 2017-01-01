import TableName from "../Core/Decorators/TableName";
import BelongsTo from "../Core/Decorators/BelongsTo";
import HasMany from "../Core/Decorators/HasMany";

import Auid from "../Core/Auid";
import BaseModel from "../Core/BaseModel";
import Database from "../Core/Database";
    
import Page from "./Page";
import SiteVersion from "./SiteVersion";
import Site from "./Site";
import Client from "./Client";
import BlockContainer from "./BlockContainer";
import BlockContainerAreaDef from "./BlockContainerAreaDef";

import Block from "./Block";

@TableName('blockcontainerarea')
@BelongsTo('BlockContainer', BlockContainer, "BlockContainerID")
@BelongsTo('BlockContainerAreaDef', BlockContainerAreaDef, "BlockContainerAreaDefID")
@BelongsTo('Page', Page, "PageID", [
    { Type: BlockContainer, Field: 'BlockContainerID' }
])
@BelongsTo('Site', Site, "SiteID", [
    { Type: SiteVersion, Field: 'SiteVersionID' },
    { Type: Page, Field: 'PageID' },
    { Type: BlockContainer, Field: 'BlockContainerID' }
])
@BelongsTo('Client', Client, "ClientID", [
    { Type: Site, Field: 'SiteID' },
    { Type: SiteVersion, Field: 'SiteVersionID' },
    { Type: Page, Field: 'PageID' },
    { Type: BlockContainer, Field: 'BlockContainerID' }
])
@HasMany('Blocks', Block, "blockcontainerareaid")
class BlockContainerArea extends BaseModel {
    constructor() {
        super();
    }

    Filter(authContext, query) {
		if(authContext.ClientID) {
			var subQuery = Database.Knex.select('clientid').from('site')
				.leftJoin('siteversion', 'site.id', '=', 'siteversion.siteid')
				.leftJoin('page', 'siteversion.id', '=', 'page.siteversionid')
				.leftJoin('blockcontainer', 'blockcontainer.pageid', '=', 'page.id');

			query.whereRaw(
				'(' + subQuery + ' where blockcontainer.id = blockcontainerarea.blockcontainerid) = ' + Auid.Decode(authContext.ClientID)
			);
		}

		if(authContext.SiteID) {
			var subQuery = Database.Knex.select('siteid').from('siteversion')
				.leftJoin('page', 'siteversion.id', '=', 'page.siteversionid')
				.leftJoin('blockcontainer', 'blockcontainer.pageid', '=', 'page.id');

			query.whereRaw(
				'(' + subQuery + ' where blockcontainer.id = blockcontainerarea.blockcontainerid) = ' + Auid.Decode(authContext.SiteID)
			);
		}
		
		if(authContext.SiteVersionID) {
			var subQuery = Database.Knex.select('siteversionid').from('page')
				.leftJoin('blockcontainer', 'blockcontainer.pageid', '=', 'page.id');

			query.whereRaw(
				'(' + subQuery + ' where blockcontainer.id = blockcontainerarea.blockcontainerid) = ' + Auid.Decode(authContext.SiteVersionID)
			);
		}
    }
}

export default new BlockContainerArea();