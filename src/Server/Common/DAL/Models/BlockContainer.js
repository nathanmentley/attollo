import TableName from "../Core/Decorators/TableName";

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

@TableName("BlockContainer")
class BlockContainer extends BaseModel {
    constructor() {
        super();
    }

    BelongsTo() {
        var ret = super.BelongsTo();

        ret.push({
            Title: 'Page',
            Type: Page,
            Field: 'PageID'
        });
        ret.push({
            Title: 'BlockContainerDef',
            Type: BlockContainerDef,
            Field: 'BlockContainerDefID'
        });
        ret.push({
            Title: 'Site',
            Type: Site,
            Field: 'SiteID',
            Through: [
                { Type: SiteVersion, Field: 'SiteVersionID' },
                { Type: Page, Field: 'PageID' }
            ]
        });
        ret.push({
            Title: 'Client',
            Type: Client,
            Field: 'ClientID',
            Through: [
                { Type: Site, Field: 'SiteID' },
                { Type: SiteVersion, Field: 'SiteVersionID' },
                { Type: Page, Field: 'PageID' }
            ]
        });

        return ret;
    }

    HasMany() {
        var ret = super.HasMany();

        ret.push({
            Title: 'BlockContainerAreas',
            Type: BlockContainerArea,
            Field: 'BlockContainerID'
        });
        ret.push({
            Title: 'BlockContainerCssRules',
            Type: BlockContainerCssRule,
            Field: 'BlockContainerID'
        });
        ret.push({
            Title: 'Blocks',
            Type: Block,
            Field: 'BlockContainerAreaID',
            Through: [
            	{ Type: BlockContainerArea, Field: 'BlockContainerID' }
            ]
        });

        return ret;
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
}

export default new BlockContainer();