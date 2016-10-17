(function () {
	module.exports = {
        PurgeRelatedBeforeSaving: function(relatedTables) {
            var self = this;

            return function(model, columns, options) {
                return new Promise(function(resolve, reject) {
                    if(model) {
                        var data = [];
                        for(var i = 0; i < relatedTables.length; i++) {
                            var table = relatedTables[i];

                            if(model.has(table) && model.get(table)) {
                                delete model.attributes[table];
                            }
                        }
                    }

                    resolve();
                });
            };
        }
    };
})();