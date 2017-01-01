import TableName from "../Core/Decorators/TableName";
import BelongsTo from "../Core/Decorators/BelongsTo";

import Auid from "../Core/Auid";
import BaseModel from "../Core/BaseModel";
import Database from "../Core/Database";

import Client from "./Client";
import Site from "./Site";
import SiteVersion from "./SiteVersion";
import Page from "./Page";
import BlockContainer from "./BlockContainer";
import BlockContainerArea from "./BlockContainerArea";
import Block from "./Block";
import BlockSettingDef from "./BlockSettingDef";

@TableName('BlockSetting')
@BelongsTo('Block', Block, "BlockID")
@BelongsTo('BlockSettingDef', BlockSettingDef, "BlockSettingDefID")
@BelongsTo('BlockContainerArea', BlockContainerArea, "BlockContainerAreaID", [
    { Type: Block, Field: 'BlockID' }
])
@BelongsTo('BlockContainer', BlockContainer, "BlockContainerID", [
    { Type: BlockContainerArea, Field: 'BlockContainerAreaID' },
    { Type: Block, Field: 'BlockID' }
])
@BelongsTo('Page', Page, "PageID", [
    { Type: BlockContainer, Field: 'BlockContainerID' },
    { Type: BlockContainerArea, Field: 'BlockContainerAreaID' },
    { Type: Block, Field: 'BlockID' }
])
@BelongsTo('Site', Site, "SiteID", [
    { Type: SiteVersion, Field: 'SiteVersionID' },
    { Type: Page, Field: 'PageID' },
    { Type: BlockContainer, Field: 'BlockContainerID' },
    { Type: BlockContainerArea, Field: 'BlockContainerAreaID' },
    { Type: Block, Field: 'BlockID' }
])
@BelongsTo('Client', Client, "ClientID", [
    { Type: Site, Field: 'SiteID' },
    { Type: SiteVersion, Field: 'SiteVersionID' },
    { Type: Page, Field: 'PageID' },
    { Type: BlockContainer, Field: 'BlockContainerID' },
    { Type: BlockContainerArea, Field: 'BlockContainerAreaID' },
    { Type: Block, Field: 'BlockID' }
])
class BlockSetting extends BaseModel {
    constructor() {
        super();
    }

    Filter(authContext, query) {
		if(authContext.ClientID) {
			var subQuery = Database.Knex.select('clientid').from('site')
				.leftJoin('siteversion', 'site.id', '=', 'siteversion.siteid')
				.leftJoin('page', 'siteversion.id', '=', 'page.siteversionid')
				.leftJoin('blockcontainer', 'blockcontainer.pageid', '=', 'page.id')
				.leftJoin('blockcontainerarea', 'blockcontainerarea.blockcontainerid', '=', 'blockcontainer.id')
				.leftJoin('block', 'block.blockcontainerareaid', '=', 'blockcontainerarea.id');

			query.whereRaw(
				'(' + subQuery + ' where block.id = blocksetting.blockid) = ' + Auid.Decode(authContext.ClientID)
			);
		}

		if(authContext.SiteID) {
			var subQuery = Database.Knex.select('siteid').from('siteversion')
				.leftJoin('page', 'siteversion.id', '=', 'page.siteversionid')
				.leftJoin('blockcontainer', 'blockcontainer.pageid', '=', 'page.id')
				.leftJoin('blockcontainerarea', 'blockcontainerarea.blockcontainerid', '=', 'blockcontainer.id')
				.leftJoin('block', 'block.blockcontainerareaid', '=', 'blockcontainerarea.id');

			query.whereRaw(
				'(' + subQuery + ' where block.id = blocksetting.blockid) = ' + Auid.Decode(authContext.SiteID)
			);
		}
		
		if(authContext.SiteVersionID) {
			var subQuery = Database.Knex.select('siteversionid').from('page')
				.leftJoin('blockcontainer', 'blockcontainer.pageid', '=', 'page.id')
				.leftJoin('blockcontainerarea', 'blockcontainerarea.blockcontainerid', '=', 'blockcontainer.id')
				.leftJoin('block', 'block.blockcontainerareaid', '=', 'blockcontainerarea.id');

			query.whereRaw(
				'(' + subQuery + ' where block.id = blocksetting.blockid) = ' + Auid.Decode(authContext.SiteVersionID)
			);
		}
    }
}

export default new BlockSetting();