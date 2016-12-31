import { Dependencies } from 'constitute';

import LogUtils from '../../Common/Utils/LogUtils';
import Attollo from "../../Common/Attollo";

class ConfiguredDataTypeResolver {
    constructor(attollo, dbContext) {
        this._attollo = attollo;

        this._dbContext = dbContext;
        this._data = {};
    }

    Resolve(blockID, resultName, dataTypeDefID, filterName) {
        var self = this;

        if(!(blockID in this._data)) {
            this._data[blockID] = {};
        }

        return new Promise((resolve, reject) => {
            self._attollo.Services.DataType.GetDataTypes(self._dbContext, dataTypeDefID, filterName)
                .then((dataTypes) => {
                    var result = dataTypes.toJSON();

                    self._data[blockID][resultName] = result;

                    resolve(result);
                })
                .catch((err) => {
                    LogUtils.Info(JSON.stringify(err));
                    reject(err);
                });
        });
    }

    GetResolvedData() {
        return this._data;
    }
}

@Dependencies(
    Attollo
)
export default class DataTypeResolver {
    constructor(attollo) {
        this._attollo = attollo;
    }

    Create(context) {
        return new ConfiguredDataTypeResolver(this._attollo, context);
    }
}