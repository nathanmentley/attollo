//Seed BlockContainerDefs
//Seed AddBlockContainerAreaDef
import constitute from 'constitute';

import Attollo from '../../../Common/Attollo';

var attollo = constitute(Attollo);

(function () {
    var classDef = function () {};

	classDef.prototype.Logic = function(dbContext, callback, errorCallback) {
        Promise.all([
            attollo.Services.Block.AddBlockContainerDef(dbContext, 'OneCol', 'One Column'),
            attollo.Services.Block.AddBlockContainerDef(dbContext, 'TwoCol', 'Two Column'),
            attollo.Services.Block.AddBlockContainerDef(dbContext, 'ThreeCol', 'Three Column'),
            attollo.Services.Block.AddBlockContainerDef(dbContext, 'FourCol', 'Four Column')
        ])
        .then(() => {
            Promise.all([
                attollo.Services.Block.AddBlockContainerAreaDef(dbContext, 'OneCol', 'First', 'First'),

                attollo.Services.Block.AddBlockContainerAreaDef(dbContext, 'TwoCol', 'First', 'First'),
                attollo.Services.Block.AddBlockContainerAreaDef(dbContext, 'TwoCol', 'Second', 'Second'),

                attollo.Services.Block.AddBlockContainerAreaDef(dbContext, 'ThreeCol', 'First', 'First'),
                attollo.Services.Block.AddBlockContainerAreaDef(dbContext, 'ThreeCol', 'Second', 'Second'),
                attollo.Services.Block.AddBlockContainerAreaDef(dbContext, 'ThreeCol', 'Third', 'Third'),

                attollo.Services.Block.AddBlockContainerAreaDef(dbContext, 'FourCol', 'First', 'First'),
                attollo.Services.Block.AddBlockContainerAreaDef(dbContext, 'FourCol', 'Second', 'Second'),
                attollo.Services.Block.AddBlockContainerAreaDef(dbContext, 'FourCol', 'Third', 'Third'),
                attollo.Services.Block.AddBlockContainerAreaDef(dbContext, 'FourCol', 'Fourth', 'Fourth')
            ])
            .then(() => {
                callback();
            })
            .catch((err) => { errorCallback(err); });
        })
        .catch((err) => { errorCallback(err); });
    };

    module.exports = new classDef();
})();