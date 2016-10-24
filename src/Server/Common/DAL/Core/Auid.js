(function () {
    var key = 4747389;

    var crypto = require('crypto');

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
            if(auid) {
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
                return null;
            }
        },
        Fetching: function(authContext, filter, fields, skipFilter) {
            var self = this;

            return function(model, columns, options) {
                return new Promise(function(resolve, reject) {
                    if(!skipFilter) {
                        filter(authContext, options.query);
                    }

                    if(options.query._statements){
                        for(var i = 0; i < options.query._statements.length; i++) {
                            if(fields.indexOf(options.query._statements[i].column) > -1) {
                                options.query._statements[i].value = self.Decode(options.query._statements[i].value);
                            }
                        }
                    }

                    resolve();
                });
            };
        },
        Fetched: function(authContext, filter, fields, skipFilter) {
            var self = this;

            return function(models, result, options) {
                return new Promise(function(resolve, reject) {
                    if(!skipFilter) {
                        filter(authContext, options.query);
                    }

                    for(var i = 0; i < result.length; i++) {
                        var data = {};
                        var model = result[i];

                        for(var j = 0; j < fields.length; j++) {
                            var field = fields[j];

                            data[field] = self.Encode(model[field]);
                        }

                        models.get(model.id).set(data);
                    }

                    resolve();
                });
            };
        },
        Saving: function(authContext, filter, fields, skipFilter) {
            var self = this;

            return function(model, columns, options) {
                return new Promise(function(resolve, reject) {
                    if(!skipFilter) {
                        filter(authContext, options.query);
                    }

                    if(model) {
                        var data = [];
                        for(var i = 0; i < fields.length; i++) {
                            var field = fields[i];

                            if(model.get(field)) {
                                data[field] = self.Decode(model.get(field));
                            }
                        }
                        model.set(data)
                    }

                    if(options.query._statements){
                        for(var i = 0; i < options.query._statements.length; i++) {
                            if(fields.indexOf(options.query._statements[i].column) > -1) {
                                options.query._statements[i].value = self.Decode(options.query._statements[i].value);
                            }
                        }
                    }

                    resolve();
                });
            };
        },
        Destroying: function(authContext, filter, fields, skipFilter) {
            var self = this;

            return function(model, options) {
                return new Promise(function(resolve, reject) {
                    if(!skipFilter) {
                        filter(authContext, options.query);
                    }

                    if(model) {
                        var data = [];
                        for(var i = 0; i < fields.length; i++) {
                            var field = fields[i];

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