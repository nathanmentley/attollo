import TableName from "../Core/Decorators/TableName";

import Auid from "../Core/Auid";
import BaseModel from "../Core/BaseModel";
import Database from "../Core/Database";

import SiteVersion from "./SiteVersion";
import Site from "./Site";
import Client from "./Client";
import BlockCssRule from "./BlockCssRule";

import BlockDef from "./BlockDef";
import BlockTemplateDef from "./BlockTemplateDef";
import BlockSetting from "./BlockSetting";
import BlockContainerAreaInstance from "./BlockContainerAreaInstance";

@TableName("Block")
class Block extends BaseModel {
    constructor() {
        super();
    }

    BelongsTo() {
        var ret = super.BelongsTo();

        ret.push({
            Title: 'BlockDef',
            Type: BlockDef,
            Field: 'BlockDefID'
        });
        ret.push({
            Title: 'BlockTemplateDef',
            Type: BlockTemplateDef,
            Field: 'BlockTemplateDefID'
        });

        ret.push({
            Title: 'Site',
            Type: Site,
            Field: 'SiteID',
            Through: [
                { Type: SiteVersion, Field: 'siteversionid' }
            ]
        });
        ret.push({
            Title: 'SiteVersion',
            Type: SiteVersion,
            Field: 'SiteVersionID'
        });
        ret.push({
            Title: 'Client',
            Type: Client,
            Field: 'ClientID',
            Through: [
                { Type: Site, Field: 'siteid' },
                { Type: SiteVersion, Field: 'siteversionid' }
            ]
        });

        return ret;
    }

    HasMany() {
        var ret = super.HasMany();

        ret.push({
            Title: 'BlockSettings',
            Type: BlockSetting,
            Field: 'BlockID'
        });
        ret.push({
            Title: 'BlockCssRules',
            Type: BlockCssRule,
            Field: 'BlockID'
        });
        ret.push({
            Title: 'BlockContainerAreaInstances',
            Type: BlockContainerAreaInstance,
            Field: 'BlockID'
        });

        return ret;
    }

    SerializableRelations() {
        return [
            { Title: 'BlockContainerAreaInstances', Type: BlockContainerAreaInstance },
            { Title: 'BlockSettings', Type: BlockSetting },
            { Title: 'BlockCssRules', Type: BlockCssRule },
            { Title: 'BlockDef', Type: BlockDef },
            { Title: 'BlockTemplateDef', Type: BlockTemplateDef }
        ];
    }

    Filter(authContext, query) {
		if(authContext.ClientID) {
			var subQuery = Database.Knex.select('clientid').from('site')
				.leftJoin('siteversion', 'site.id', '=', 'siteversion.siteid')
			query.whereRaw(
				'(' + subQuery + ' where siteversion.id = block.siteversionid) = ' + Auid.Decode(authContext.ClientID)
			);
		}
		if(authContext.SiteID) {
			var subQuery = Database.Knex.select('siteid').from('siteversion')
			query.whereRaw(
				'(' + subQuery + ' where siteversion.id = block.siteversionid) = ' + Auid.Decode(authContext.SiteID)
			);
		}
		
		if(authContext.SiteVersionID) {
			query.where('siteversionid', '=', authContext.SiteVersionID);
		}
    }
}

export default new Block();