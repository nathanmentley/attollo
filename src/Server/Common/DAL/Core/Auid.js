(function () {
    var key = 4747389;
    var crypto = require('crypto');
    
    var SchemaIdFields = [
        'ID'.toLowerCase(),
        'ClientID'.toLowerCase(),
        'SiteID'.toLowerCase(),
        'SiteVersionStatusID'.toLowerCase(),
        'PageDefID'.toLowerCase(),
        'SiteVersionID'.toLowerCase(),
        'BlockContainerDefID'.toLowerCase(),
        'BlockContainerAreaID'.toLowerCase(),
        'PageID'.toLowerCase(),
        'BlockContainerID'.toLowerCase(),
        'BlockContainerAreaDefID'.toLowerCase(),
        'BlockDefID'.toLowerCase(),
        'BlockTemplateDefID'.toLowerCase(),
        'SettingTypeID'.toLowerCase(),
        'BlockID'.toLowerCase(),
        'BlockSettingDefID'.toLowerCase()
    ];

	module.exports = {
        Encode: function(id) {
            if(id) {
                var newId = id ^ key;
                newId = newId << 5;
                newId = newId.toString(36).toUpperCase();

                return newId + "-" + (crypto.createHash('sha1')
                        .update(newId, 'utf8')
                        .digest('hex').substring(0, 4));
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

                    for(var i = 0; i < result.length; i++) {
                        var data = {};
                        var model = result[i];

                        for(var j = 0; j < SchemaIdFields.length; j++) {
                            var field = SchemaIdFields[j];

                            data[field] = self.Encode(model[field]);
                        }

                        models.get(model.id).set(data);
                    }

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

                    resolve();
                });
            };
        }
    };
})();