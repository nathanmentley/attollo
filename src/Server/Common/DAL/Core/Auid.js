(function () {
	module.exports = {
        Encode: function(id) {
            return "L-" + id;
        },
        Decode: function(auid) {
            return auid.substring(2);
        },
        Fetching: function(fields) {
            var self = this;

            return function(model, columns, options) {
                return new Promise(function(resolve, reject) {
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
        Fetched: function(fields) {
            var self = this;

            return function(models, result, options) {
                return new Promise(function(resolve, reject) {
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
        Saving: function(fields) {
            var self = this;

            return function(model, columns, options) {
                return new Promise(function(resolve, reject) {
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
        }
    };
})();