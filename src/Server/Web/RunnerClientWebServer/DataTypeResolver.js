import Attollo from "../../Common/Attollo";
import LogUtils from '../../Common/Utils/LogUtils';

export default class DataTypeResolver {
    constructor(dbContext) {
        this._dbContext = dbContext;
        this._data = {};
    }

    Resolve(blockID, resultName, dataTypeDefID, filterName) {
        var self = this;

        if(!(blockID in this._data)) {
            this._data[blockID] = {};
        }

        return new Promise((resolve, reject) => {
            Attollo.Services.DataType.GetDataTypes(self._dbContext, dataTypeDefID, filterName)
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