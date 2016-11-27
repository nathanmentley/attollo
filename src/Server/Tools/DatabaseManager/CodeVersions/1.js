//Seed PluginDefs

(function () {
	var PluginDefCodes = require('../../../../Platform/Constants/PluginDefCodes');
	var DataTypeFieldTypeCodes = require('../../../../Platform/Constants/DataTypeFieldTypeCodes');

    var classDef = function () {};

	classDef.prototype.Logic = function(dbContext, callback, errorCallback) {
        Promise.all([
            Attollo.Services.DataType.AddDataTypeFieldType(dbContext, { name: 'Text', code: DataTypeFieldTypeCodes.Text }),
            Attollo.Services.DataType.AddDataTypeFieldType(dbContext, { name: 'HTML', code: DataTypeFieldTypeCodes.HTML })
        ])
        .then((result) => {
            Promise.all([
                Attollo.Services.Plugin.AddPluginDef(dbContext, { name: 'Core', code: PluginDefCodes.Core, description: 'core details' }),
                Attollo.Services.Plugin.AddPluginDef(dbContext, { name: 'Blog', code: PluginDefCodes.Blog, description: 'blog details' })
            ])
            .then(() => {
                Promise.all([
                    new Promise((resolve, reject) => {
                        Attollo.Services.DataType.AddDataTypeDef(dbContext, PluginDefCodes.Blog, { name: 'Blog Posts' })
                        .then((result) => {
                            Promise.all([
                                Attollo.Services.DataType.AddDataTypeFieldDef(dbContext, DataTypeFieldTypeCodes.Text, { name: 'Title', datatypedefid: result.get('id') }),
                                Attollo.Services.DataType.AddDataTypeFieldDef(dbContext, DataTypeFieldTypeCodes.Text, { name: 'Summary', datatypedefid: result.get('id') }),
                                Attollo.Services.DataType.AddDataTypeFieldDef(dbContext, DataTypeFieldTypeCodes.HTML, { name: 'Content', datatypedefid: result.get('id') })
                            ])
                            .then(() => {
                            resolve();
                            })
                            .catch((err) => {
                                reject(err);
                            })
                        })
                        .catch((err) => {
                            reject(err);
                        });
                    })
                ])
                .then(() => {
                    callback();
                })
                .catch((err) => {
                    errorCallback(err);
                });
            })
            .catch((err) => {
                errorCallback(err);
            });
        })
        .catch((err) => {
            errorCallback(err);
        });
    };

    module.exports = new classDef();
})();