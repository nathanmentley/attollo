import AjaxService from './AjaxService.jsx';

var endpoint = "/DataTypeDefs";

export default class DataTypeDefService {
    static GetDataTypeDefs() {
        return AjaxService.Get(endpoint, {}, {});
    }

    static AddDataTypeDef(pluginDefCode, dataTypeDef) {
        return AjaxService.Post(endpoint, { pluginDefCode: pluginDefCode, dataTypeDef: dataTypeDef }, {});
    }

    static SaveDataTypeDef(dataTypeDef) {
        return AjaxService.Put(endpoint, { dataTypeDef: dataTypeDef }, {});
    }
    
    static DeleteDataTypeDef(dataTypeDefId) {
        return AjaxService.Delete(endpoint + "?dataTypeDefId=" + dataTypeDefId, {}, {});
    }
}