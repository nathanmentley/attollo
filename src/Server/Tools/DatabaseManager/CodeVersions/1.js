//Seed PluginDefs
import constitute from 'constitute';

import Attollo from '../../../Common/Attollo';

import PluginDefCodes from '../../../../Platform/Constants/PluginDefCodes';
import PluginDefLogicTargetCodes from '../../../../Platform/Constants/PluginDefLogicTargetCodes';
import PluginDefLogicDefCodes from '../../../../Platform/Constants/PluginDefLogicDefCodes';
import DataTypeFieldTypeCodes from '../../../../Platform/Constants/DataTypeFieldTypeCodes';

var attollo = constitute(Attollo);

(function () {
    var classDef = function () {};

	classDef.prototype.Logic = function(dbContext, callback, errorCallback) {
        Promise.all([
            attollo.Services.DataType.AddDataTypeFieldType(dbContext, { name: 'Text', code: DataTypeFieldTypeCodes.Text }),
            attollo.Services.DataType.AddDataTypeFieldType(dbContext, { name: 'HTML', code: DataTypeFieldTypeCodes.HTML }),

            attollo.Services.Plugin.AddPluginDefLogicTarget(dbContext, { title: 'Pre Action', code: PluginDefLogicTargetCodes.Pre }),
            attollo.Services.Plugin.AddPluginDefLogicTarget(dbContext, { title: 'Post Action', code: PluginDefLogicTargetCodes.Post }),
            attollo.Services.Plugin.AddPluginDefLogicTarget(dbContext, { title: 'Override Action', code: PluginDefLogicTargetCodes.Override }),
            
            attollo.Services.Plugin.AddPluginDefLogicDef(dbContext, { title: 'Control Center -> Get -> Users', code: PluginDefLogicDefCodes.ControlCenter_Get_Users })
        ])
        .then((result) => {
            Promise.all([
                attollo.Services.Plugin.AddPluginDef(dbContext, { name: 'Core', code: PluginDefCodes.Core, description: 'core details' }),
                attollo.Services.Plugin.AddPluginDef(dbContext, { name: 'Blog', code: PluginDefCodes.Blog, description: 'blog details' })
            ])
            .then(() => {
                Promise.all([
                    new Promise((resolve, reject) => {
                        attollo.Services.DataType.AddDataTypeDef(dbContext, PluginDefCodes.Blog, { name: 'Blog Posts' })
                        .then((result) => {
                            Promise.all([
                                attollo.Services.DataType.AddDataTypeFieldDef(dbContext, DataTypeFieldTypeCodes.Text, { name: 'Title', datatypedefid: result.get('id') }),
                                attollo.Services.DataType.AddDataTypeFieldDef(dbContext, DataTypeFieldTypeCodes.Text, { name: 'Summary', datatypedefid: result.get('id') }),
                                attollo.Services.DataType.AddDataTypeFieldDef(dbContext, DataTypeFieldTypeCodes.HTML, { name: 'Content', datatypedefid: result.get('id') })
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