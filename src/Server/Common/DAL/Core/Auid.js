(function () {
    var key = 4747389;
    var crypto = require('crypto');
    
    var SchemaIdFields = [
        'ID'.toLowerCase(),

        'AdminPermissionID'.toLowerCase(),

        'BlockContainerID'.toLowerCase(),
        'BlockContainerDefID'.toLowerCase(),
        'BlockContainerAreaID'.toLowerCase(),
        'BlockContainerAreaDefID'.toLowerCase(),
        'BlockID'.toLowerCase(),
        "BlockCssRuleID".toLowerCase(),
        'BlockDefID'.toLowerCase(),
        'BlockSettingID'.toLowerCase(),
        'BlockSettingDefID'.toLowerCase(),
        'BlockTemplateDefID'.toLowerCase(),

        'ClientID'.toLowerCase(),

        "CssRuleID".toLowerCase(),
        "CssRuleDefID".toLowerCase(),
        "CssRuleDefTypeID".toLowerCase(),
        "CssRuleDefGroupID".toLowerCase(),

        "DataTypeID".toLowerCase(),
        "DataTypeDefID".toLowerCase(),
        "DataTypeFieldID".toLowerCase(),
        "DataTypeFieldDefID".toLowerCase(),
        "DataTypeFieldTypeID".toLowerCase(),

        'PageID'.toLowerCase(),
        'PageDefID'.toLowerCase(),
        "PermissionDefID".toLowerCase(),

        'PluginID'.toLowerCase(),
        "PluginDefID".toLowerCase(),
        'PluginDefLogicDefID'.toLowerCase(),
        'PluginDefLogicID'.toLowerCase(),
        'PluginSettingDefID'.toLowerCase(),
        'PluginSettingID'.toLowerCase(),

        'RoleID'.toLowerCase(),

        'SiteID'.toLowerCase(),
        'SiteVersionStatusID'.toLowerCase(),
        'SiteVersionID'.toLowerCase(),
        'SettingTypeID'.toLowerCase(),

        "ThemeID".toLowerCase(),
        "ThemeCssRuleID".toLowerCase()
    ];

	module.exports = {
        Encode: function(id) {
            if(id) {
                var newId = id ^ key;
                newId = newId << 5;
                newId = newId.toString(36).toUpperCase();

                return newId + "-" + (crypto.createHash('sha1')
                        .update(newId, 'utf8')
                        .digest('hex').substring(0, 4))
                        .toUpperCase();
            }else{
                return null;
            }
        },
        Decode: function(auid) {
            if(auid && typeof auid === 'string') {
                var newId = auid.split('-')[0];
                var checkSumClaim = auid.split('-')[1];
                var checkSumExpected = (crypto.createHash('sha1')
                        .update(newId, 'utf8')
                        .digest('hex').substring(0, 4))
                        .toUpperCase();

                if(checkSumClaim !== checkSumExpected) {
                    throw new Error("Invalid AUID.");
                }

                newId = parseInt(newId.toLowerCase(), 36) >> 5;
                newId = newId ^ key;
                return newId;
            }else{
                return auid;
            }
        },

        EncodeIdsForModel: function (models, model, touched) {
            var self = this;
            var data = {};

            if (model) {
                var uniqueid = '';//model.tableName + '[' + model.id + ']';
                
                if (touched.indexOf(uniqueid) > -1) {
                    //return;
                } else {
                    touched.push(uniqueid);
                }

                if (model.attributes) {
                    Object.keys(model.attributes).forEach(function(key) {
                        for(var i = 0; i < SchemaIdFields.length; i++) {
                            if(SchemaIdFields[i] == key) {
                                var field = SchemaIdFields[i];

                                if(model.get(field)) {
                                    data[field] = self.Encode(model.get(field));
                                }
                            }
                        }
                    });
                }

                if (model.relations) {
                    Object.keys(model.relations).forEach(function(key) {
                        var related = model.relations[key];

                        if (related) {
                            if(related.length != null) {
                                if(related.length > 0) {
                                    self.EncodeIdsForSubCollection(models, related, touched);
                                }
                            } else {
                                self.EncodeIdsForModel(models, related, touched);
                            }
                        }
                    });
                }

                model.set(data);
            }
        },

        EncodeIdsForSubCollection: function (models, collection, touched) {
            var self = this;

            if(!touched) {
                touched = [];
            }

            collection.forEach(function (model) {
                var bsModel = collection.get(model.id);

                self.EncodeIdsForModel(models, bsModel, touched);
            });
        },

        EncodeIdsForCollection: function (models, collection, touched) {
            var self = this;

            if(!touched) {
                touched = [];
            }

            for(var i = 0; i < collection.length; i++) {
                var bsModel = models.get(collection[i].id);
                self.EncodeIdsForModel(models, bsModel, touched);
            }
        },

        Fetching: function(authContext, filter, skipFilter) {
            var self = this;

            return function(model, columns, options) {
                return new Promise(function(resolve, reject) {
                    if(!skipFilter) {
                        filter(authContext, options.query);
                    }

                    if(options.query._statements){
                        for(var i = 0; i < options.query._statements.length; i++) {
                            if(options.query._statements[i].column) {
                                var column = options.query._statements[i].column.split('.').pop();

                                if(SchemaIdFields.indexOf(column) > -1) {
                                    if(options.query._statements[i].value) {
                                        var id = self.Decode(options.query._statements[i].value);

                                        options.query._statements[i].value = id;
                                    }
                                }
                            }
                        }
                    }

                    resolve();
                });
            };
        },
        Fetched: function(authContext, filter, skipFilter) {
            var self = this;

            return function(models, result, options) {
                return new Promise(function(resolve, reject) {
                    if(!skipFilter) {
                        filter(authContext, options.query);
                    }

                    self.EncodeIdsForCollection(models, result);

                    resolve();
                });
            };
        },
        Saving: function(authContext, filter, skipFilter) {
            var self = this;

            return function(model, columns, options) {
                return new Promise(function(resolve, reject) {
                    if(!skipFilter) {
                        filter(authContext, options.query);
                    }

                    if(model) {
                        var data = [];
                        for(var i = 0; i < SchemaIdFields.length; i++) {
                            var field = SchemaIdFields[i];

                            if(model.get(field)) {
                                data[field] = self.Decode(model.get(field));
                            }
                        }
                        model.set(data)
                    }

                    if(options.query._statements){
                        for(var i = 0; i < options.query._statements.length; i++) {
                            if(options.query._statements[i].column) {
                                var column = options.query._statements[i].column.split('.').pop();

                                if(SchemaIdFields.indexOf(column) > -1) {
                                    if(options.query._statements[i].value) {
                                        var id = self.Decode(options.query._statements[i].value);

                                        options.query._statements[i].value = id;
                                    }
                                }
                            }
                        }
                    }

                    resolve();
                });
            };
        },
        Destroying: function(authContext, filter, skipFilter) {
            var self = this;

            return function(model, options) {
                return new Promise(function(resolve, reject) {
                    if(!skipFilter) {
                        filter(authContext, options.query);
                    }

                    if(model) {
                        var data = [];
                        for(var i = 0; i < SchemaIdFields.length; i++) {
                            var field = SchemaIdFields[i];

                            if(model.get(field)) {
                                data[field] = self.Decode(model.get(field));
                            }
                        }
                        model.set(data)
                    }

                    if(options.query._statements){
                        for(var i = 0; i < options.query._statements.length; i++) {
                            if(options.query._statements[i].column) {
                                var column = options.query._statements[i].column.split('.').pop();

                                if(SchemaIdFields.indexOf(column) > -1) {
                                    if(options.query._statements[i].value) {
                                        var id = self.Decode(options.query._statements[i].value);

                                        options.query._statements[i].value = id;
                                    }
                                }
                            }
                        }
                    }

                    resolve();
                });
            };
        }
    };
})();