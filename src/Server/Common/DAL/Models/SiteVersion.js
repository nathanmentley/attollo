import TableName from "../Core/Decorators/TableName";

import Auid from "../Core/Auid";
import BaseModel from "../Core/BaseModel";
import Database from "../Core/Database";

import Site from "./Site";
import Client from "./Client";

import Block from "./Block";
import Page from "./Page";
import SiteVersionStatus from "./SiteVersionStatus";
import Theme from "./Theme";

@TableName('SiteVersion')
class SiteVersion extends BaseModel {
    constructor() {
        super();
    }

    BelongsTo() {
        return [
            { Title: 'Site', Type: Site, Field: "SiteID"  },
            { Title: 'Theme', Type: Theme, Field: "ThemeID"  },
            { Title: 'SiteVersionStatus', Type: SiteVersionStatus, Field: "SiteVersionStatusID"  },
            { Title: 'Client', Type: Client, Field: "ClientID", Through: [
                { Title: 'Site', Type: Site, Field: 'SiteID' }
            ] }
		];
    }

    HasMany() {
    	return [
            { Title: 'Pages', Type: Page, Field: "SiteVersionID"  },
            { Title: 'Blocks', Type: Block, Field: "SiteVersionID"  }
		];
	}

    SerializableRelations() {
        return [
            { Title: 'Pages', Type: Page },
            { Title: 'Blocks', Type: Block }
		];
    }

    Filter(authContext, query) {
		if(authContext.ClientID) {
			var subQuery = Database.Knex.select('clientid').from('site');

			query.whereRaw(
				'(' + subQuery + ' where site.id = siteversion.siteid) = ' + Auid.Decode(authContext.ClientID)
			);
		}

		if(authContext.SiteID) {
			var subQuery = Database.Knex.select('id').from('site');

			query.whereRaw(
				'(' + subQuery + ' where site.id = siteversion.siteid) = ' + Auid.Decode(authContext.SiteID)
			);
		}
		
		if(authContext.SiteVersionID) {
			query.where('siteversion.id', '=', authContext.SiteVersionID);
		}
    }
}

export default new SiteVersion();