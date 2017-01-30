import TableName from "../Core/Decorators/TableName";

import Auid from "../Core/Auid";
import BaseModel from "../Core/BaseModel";
import Database from "../Core/Database";

import PluginDef from "./PluginDef";

@TableName('Plugin')
class Plugin extends BaseModel {
    constructor() {
        super();
    }

    BelongsTo() {
        var belongsTo = super.BelongsTo();

        belongsTo.push({ Title: 'PluginDef', Type: PluginDef, Field: "PluginDefID"  });

        return belongsTo;
    }

    Filter(authContext, query) {
        if(authContext.ClientID) {
            var subQuery = Database.Knex.select('clientid').from('site')
                .leftJoin('siteversion', 'site.id', '=', 'siteversion.siteid');

            query.whereRaw(
                '(' + subQuery + ' where siteversion.id = plugin.siteversionid) = ' + Auid.Decode(authContext.ClientID)
            );
        }

        if(authContext.SiteID) {
            var subQuery = Database.Knex.select('siteid').from('siteversion');

            query.whereRaw(
                '(' + subQuery + ' where siteversion.id = plugin.siteversionid) = ' + Auid.Decode(authContext.SiteID)
            );
        }

        if(authContext.SiteVersionID) {
            query.where('siteversionid', '=', authContext.SiteVersionID);
        }
    }
}

export default new Plugin();