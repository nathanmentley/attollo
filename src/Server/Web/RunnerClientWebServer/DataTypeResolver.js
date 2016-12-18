import Attollo from "../../Common/Attollo";

export default class DataTypeResolver {
    constructor() {
        this._data = {};
    }

    Resolve(blockID, resultName, dataTypeDefID, filterName) {
        if(!(blockID in this._data)) {
            this._data[blockID] = {};
        }

        return new Promise((resolve, reject) => {
            Attollo.Services.DataType.GetDataTypes(request.AuthContext, dataTypeDefID, filterName)
                .then((dataTypes) => {
                    var result = dataTypes.toJSON();

                    this._data[blockID][resultName] = result;

                    resolve(result);
                })
                .catch((err) => {
                    reject(err);
                });
        });
    }

    GetResolvedData() {
        return this._data;
    }
}