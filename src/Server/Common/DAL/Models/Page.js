import TableName from "../Core/Decorators/TableName";


import Auid from "../Core/Auid";
import BaseModel from "../Core/BaseModel";
import Database from "../Core/Database";

import SiteVersion from "./SiteVersion";
import Site from "./Site";
import Client from "./Client";
import PageDef from "./PageDef";

import BlockContainer from "./BlockContainer";

@TableName('Page')
class Page extends BaseModel {
    constructor() {
        super();
    }

    BelongsTo() {
        var belongsTo = super.BelongsTo();

        belongsTo.push({ Title: 'SiteVersion', Type: SiteVersion, Field: "SiteVersionID"  });
        belongsTo.push({ Title: 'PageDef', Type: PageDef, Field: "PageDefID"  });
        belongsTo.push({ Title: 'Site', Type: Site, Field: "SiteID", Through: [
            { Type: SiteVersion, Field: 'SiteVersionID' }
        ] });
        belongsTo.push({ Title: 'Client', Type: Client, Field: "ClientID", Through: [
            { Type: Site, Field: 'SiteID' },
            { Type: SiteVersion, Field: 'SiteVersionID' }
        ] });

        return belongsTo;
    }

    HasMany() {
        return [
            { Title: 'BlockContainers', Type: BlockContainer, Field: "PageID"  }
        ];
    }

    SerializableRelations() {
        return [
            { Title: 'PageDef', Type: PageDef },
            { Title: 'BlockContainers', Type: BlockContainer  }
        ];
    }

    Filter(authContext, query) {
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
    }
}

export default new Page();