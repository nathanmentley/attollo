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
import BlockCssRule from "./BlockCssRule";
import BlockContainer from "./BlockContainer";
import BlockContainerArea from "./BlockContainerArea";
import BlockContainerAreaDef from "./BlockContainerAreaDef";
import BlockDef from "./BlockDef";
import BlockTemplateDef from "./BlockTemplateDef";
import BlockSetting from "./BlockSetting";

@TableName("Block")
@BelongsTo('BlockContainerArea', BlockContainerArea, "blockcontainerareaid")
@BelongsTo('BlockContainerAreaDef', BlockContainerAreaDef, "blockcontainerareadefid", [
    { Type: BlockContainerArea, Field: 'blockcontainerareaid' }
])
@BelongsTo('BlockContainer', BlockContainer, "blockcontainerid", [
    { Type: BlockContainerAreaDef, Field: 'blockcontainerareadefid' }
])
@BelongsTo('Page', Page, "pageid", [
    { Type: BlockContainer, Field: 'blockcontainerid' },
    { Type: BlockContainerAreaDef, Field: 'blockcontainerareadefid' }
])
@BelongsTo('Site', Site, "siteid", [
    { Type: SiteVersion, Field: 'siteversionid' },
    { Type: Page, Field: 'pageid' },
    { Type: BlockContainer, Field: 'blockcontainerid' },
    { Type: BlockContainerAreaDef, Field: 'blockcontainerareadefid' }
])
@BelongsTo('Client', Client, "clientid", [
    { Type: Site, Field: 'siteid' },
    { Type: SiteVersion, Field: 'siteversionid' },
    { Type: Page, Field: 'pageid' },
    { Type: BlockContainer, Field: 'blockcontainerid' },
    { Type: BlockContainerAreaDef, Field: 'blockcontainerareadefid' }
])
@BelongsTo('BlockDef', BlockDef, "blockdefid")
@BelongsTo('BlockTemplateDef', BlockTemplateDef, "blocktemplatedefid")
@HasMany('BlockSettings', BlockSetting, "blockid")
@HasMany('BlockCssRules', BlockCssRule, "blockid")
class Block extends BaseModel {
    constructor() {
        super();
    }

    Filter(authContext, query) {
		if(authContext.ClientID) {
			var subQuery = Database.Knex.select('clientid').from('site')
				.leftJoin('siteversion', 'site.id', '=', 'siteversion.siteid')
				.leftJoin('page', 'siteversion.id', '=', 'page.siteversionid')
				.leftJoin('blockcontainer', 'blockcontainer.pageid', '=', 'page.id')
				.leftJoin('blockcontainerarea', 'blockcontainerarea.blockcontainerid', '=', 'blockcontainer.id');
			query.whereRaw(
				'(' + subQuery + ' where blockcontainerarea.id = block.blockcontainerareaid) = ' + Auid.Decode(authContext.ClientID)
			);
		}
		if(authContext.SiteID) {
			var subQuery = Database.Knex.select('siteid').from('siteversion')
				.leftJoin('page', 'siteversion.id', '=', 'page.siteversionid')
				.leftJoin('blockcontainer', 'blockcontainer.pageid', '=', 'page.id')
				.leftJoin('blockcontainerarea', 'blockcontainerarea.blockcontainerid', '=', 'blockcontainer.id');
			query.whereRaw(
				'(' + subQuery + ' where blockcontainerarea.id = block.blockcontainerareaid) = ' + Auid.Decode(authContext.SiteID)
			);
		}
		
		if(authContext.SiteVersionID) {
			var subQuery = Database.Knex.select('siteversionid').from('page')
				.leftJoin('blockcontainer', 'blockcontainer.pageid', '=', 'page.id')
				.leftJoin('blockcontainerarea', 'blockcontainerarea.blockcontainerid', '=', 'blockcontainer.id');
			query.whereRaw(
				'(' + subQuery + ' where blockcontainerarea.id = block.blockcontainerareaid) = ' + Auid.Decode(authContext.SiteVersionID)
			);
		}
    }
}

export default new Block();