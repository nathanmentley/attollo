(function () {
	module.exports = {
        Encode: function(id) {
            return "L-" + id;
        },
        Decode: function(auid) {
            Attollo.Utils.Log.Info(auid);
            Attollo.Utils.Log.Info(auid.substring(2));
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
                    for(var i = 1; i < models.length + 1; i++) {
                        var data = {};
                        for(var j = 0; j < fields.length; j++) {
                            data[fields[j]] = self.Encode(models.get(i).get(fields[j]));
                        }
                        models.get(i).set(data);
                    }

                    resolve(models);
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