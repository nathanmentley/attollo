import TableName from "../Core/Decorators/TableName";

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
class Block extends BaseModel {
    constructor() {
        super();
    }

    BelongsTo() {
        var ret = super.BelongsTo();

        ret.push({
            Name: 'BlockDef',
            Type: BlockDef,
            Field: 'BlockDefID'
        });
        ret.push({
            Name: 'BlockTemplateDef',
            Type: BlockTemplateDef,
            Field: 'BlockTemplateDefID'
        });
        ret.push({
            Name: 'BlockContainerArea',
            Type: BlockContainerArea,
            Field: 'BlockContainerAreaID'
        });

        ret.push({
            Name: 'BlockContainerAreaDef',
            Type: BlockContainerAreaDef,
            Field: 'BlockContainerAreaDefID',
            Through: [
                { Type: BlockContainerArea, Field: 'blockcontainerareaid' }
            ]
        });
        ret.push({
            Name: 'BlockContainer',
            Type: BlockContainer,
            Field: 'BlockContainerID',
            Through: [
                { Type: BlockContainerAreaDef, Field: 'blockcontainerareadefid' }
            ]
        });
        ret.push({
            Name: 'Page',
            Type: Page,
            Field: 'PageID',
            Through: [
                { Type: BlockContainer, Field: 'blockcontainerid' },
                { Type: BlockContainerAreaDef, Field: 'blockcontainerareadefid' }
            ]
        });
        ret.push({
            Name: 'Site',
            Type: Site,
            Field: 'SiteID',
            Through: [
                { Type: SiteVersion, Field: 'siteversionid' },
                { Type: Page, Field: 'pageid' },
                { Type: BlockContainer, Field: 'blockcontainerid' },
                { Type: BlockContainerAreaDef, Field: 'blockcontainerareadefid' }
            ]
        });
        ret.push({
            Name: 'Client',
            Type: Client,
            Field: 'ClientID',
            Through: [
                { Type: Site, Field: 'siteid' },
                { Type: SiteVersion, Field: 'siteversionid' },
                { Type: Page, Field: 'pageid' },
                { Type: BlockContainer, Field: 'blockcontainerid' },
                { Type: BlockContainerAreaDef, Field: 'blockcontainerareadefid' }
            ]
        });

        return ret;
    }

    HasMany() {
        var ret = super.HasMany();

        ret.push({
            Name: 'BlockSettings',
            Type: BlockSetting,
            Field: 'BlockID'
        });
        ret.push({
            Name: 'BlockCssRules',
            Type: BlockCssRule,
            Field: 'BlockID'
        });

        return ret;
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