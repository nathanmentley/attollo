import TableName from "../Core/Decorators/TableName";



import Auid from "../Core/Auid";
import BaseModel from "../Core/BaseModel";
import Database from "../Core/Database";
    
import Page from "./Page";
import SiteVersion from "./SiteVersion";
import Site from "./Site";
import Client from "./Client";
import BlockContainer from "./BlockContainer";
import BlockContainerAreaDef from "./BlockContainerAreaDef";

import BlockContainerAreaInstance from "./BlockContainerAreaInstance";

@TableName('blockcontainerarea')
class BlockContainerArea extends BaseModel {
    constructor() {
        super();
    }

    BelongsTo() {
        var belongsTo = super.BelongsTo();

        belongsTo.push({ Title: 'BlockContainer', Type: BlockContainer, Field: "BlockContainerID"  });
        belongsTo.push({ Title: 'BlockContainerAreaDef', Type: BlockContainerAreaDef, Field: "BlockContainerAreaDefID"  });
        belongsTo.push({ Title: 'Page', Type: Page, Field: "PageID", Through: [
            { Type: BlockContainer, Field: 'BlockContainerID' }
        ] });
        belongsTo.push({ Title: 'Site', Type: Site, Field: "SiteID", Through: [
            { Type: SiteVersion, Field: 'SiteVersionID' },
            { Type: Page, Field: 'PageID' },
            { Type: BlockContainer, Field: 'BlockContainerID' }
        ] });
        belongsTo.push({ Title: 'Client', Type: Client, Field: "ClientID", Through: [
            { Type: Site, Field: 'SiteID' },
            { Type: SiteVersion, Field: 'SiteVersionID' },
            { Type: Page, Field: 'PageID' },
            { Type: BlockContainer, Field: 'BlockContainerID' }
        ] });

        return belongsTo;
    }

    HasMany() {
        var hasMany = super.HasMany();

        hasMany.push({ Title: 'BlockContainerAreaInstances', Type: BlockContainerAreaInstance, Field: "blockcontainerareaid"  });

        return hasMany;
    }

    SerializableRelations() {
        return [
            { Title: 'BlockContainerAreaInstances', Type: BlockContainerAreaInstance },
            { Title: 'BlockContainerAreaDef', Type: BlockContainerAreaDef }
        ];
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