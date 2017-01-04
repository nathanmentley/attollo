import Auid from "../Core/Auid";
import Database from "../Core/Database";
import ModelEvents from "../Core/ModelEvents";

export default class BaseModel {
    constructor() {
        this.PrimaryKey = this.PrimaryKey.bind(this);
        this.ForeignKeys = this.ForeignKeys.bind(this);

        this.Filter = this.Filter.bind(this);

        this._GetBaseModel = this._GetBaseModel.bind(this);
        this.BelongsTo = this.BelongsTo.bind(this);
        this.HasMany = this.HasMany.bind(this);

        this.Collection = this.Collection.bind(this);
        this.Model = this.Model.bind(this);
    }

    PrimaryKey() {
        return this.TableName + 'id';
    };

    ForeignKeys() {
        //TODO: Pull this form Relations?
        var keys = [];

        return keys;
    }

    Filter(authContext, query) {
    }

    BelongsTo() {
        return [];
    }

    HasMany() {
        return [];
    }

    _GetBaseModel(authContext, skipFilter) {
        var ret = {};

        this.BelongsTo().forEach((belongs) => {
            ret[belongs.Name] = function() {
                var belong = this.belongsTo(belongs.Type.Model(authContext, skipFilter), belongs.Field);

                if(belongs.Through) {
                    belongs.Through.forEach((through) => {
                        belong.through(through.Type.Model(authContext, skipFilter), through.Field);
                    });
                }

                return belong;
            };
        });

        this.HasMany().forEach((hasManys) => {
            ret[hasManys.Name] = function() {
                var hasMany = this.hasMany(hasManys.Type.Model(authContext, skipFilter), hasManys.Field);

                if (hasManys.Through) {
                    hasManys.Through.forEach((through) => {
                        hasMany.through(through.Type.Model(authContext, skipFilter), through.Field);
                    });
                }

                return hasMany;
            }
        });


        return ret;
    }

	Model(authContext, skipFilter) {
        var filter = this.Filter;
        var tableName = this.TableName;

        var model = this._GetBaseModel(authContext, skipFilter);
        var relationNames = [];

        Object.keys(model).forEach((key) => {
            relationNames.push(key);
        });

        model.tableName = this.TableName;
        model.hidden = this.HiddenFields || [];
        model.constructor = function() {
            Database.Bookshelf.Model.apply(this, arguments);
            this.on("fetching", Auid.Fetching(authContext, filter, skipFilter));
            this.on("fetched", Auid.Fetched(authContext, filter, skipFilter));
            this.on("saving", Auid.Saving(authContext, filter, skipFilter));
            this.on("saving", ModelEvents.PurgeRelatedBeforeSaving(relationNames));
            this.on("destroying", Auid.Destroying(authContext, filter, skipFilter));
            this.on("created", ModelEvents.AuditCreated(authContext, tableName));
            this.on("updating", ModelEvents.AuditUpdating(authContext, tableName));
            this.on("destroying", ModelEvents.AuditDestroying(authContext, tableName));
        };

        return Database.Bookshelf.Model.extend(model);
    }

	Collection(authContext, skipFilter) {
        var filter = this.Filter;
        var tableName = this.TableName;
        var relations = this._GetBaseModel(authContext, skipFilter);
        var relationNames = [];
        Object.keys(relations).forEach((key) => {
            relationNames.push(key);
        });

        var collection = Database.Bookshelf.Collection.extend(
            {
                model: this.Model(authContext, skipFilter)
            }
        )
        .forge()
        .on("fetching", Auid.Fetching(authContext, filter, skipFilter))
        .on("fetched", Auid.Fetched(authContext, filter, skipFilter))
        .on("saving", Auid.Saving(authContext, filter, skipFilter))
        .on("saving", ModelEvents.PurgeRelatedBeforeSaving(relationNames))
        .on("destroying", Auid.Destroying(authContext, filter, skipFilter))
        .on("created", ModelEvents.AuditCreated(authContext, tableName))
        .on("updating", ModelEvents.AuditUpdating(authContext, tableName))
        .on("destroying", ModelEvents.AuditDestroying(authContext, tableName));

        return collection;
    }
};