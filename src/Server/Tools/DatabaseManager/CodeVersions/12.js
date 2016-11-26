//Seed PageDefs

(function () {
	var DataTypeFieldTypeCodes = require('../../../../Platform/Constants/DataTypeFieldTypeCodes');

    var classDef = function () {};

	classDef.prototype.Logic = function(dbContext, callback, errorCallback) {
        Promise.all([
            Attollo.Services.DataType.AddDataTypeFieldType(dbContext, { name: 'Text', code: DataTypeFieldTypeCodes.Text }),
            Attollo.Services.DataType.AddDataTypeFieldType(dbContext, { name: 'HTML', code: DataTypeFieldTypeCodes.HTML })
        ])
        .then((result) => {
            callback(result);
        })
        .catch((err) => {
            errorCallback(err);
        });
    };

    module.exports = new classDef();
})();