import AjaxService from './AjaxService.jsx';

var endpoint = "/DataTypeFieldDefs";

export default class DataTypeFieldDefService {
    static GetDataTypeFieldDefs(dataTypeDefId) {
        return AjaxService.Get(endpoint + "?dataTypeDefId=" + dataTypeDefId, {}, {});
    }

    static AddDataTypeFieldDef(dataTypeFieldDef) {
        return AjaxService.Post(endpoint, { dataTypeFieldDef: dataTypeFieldDef }, {});
    }

    static SaveDataTypeFieldDef(dataTypeFieldDef) {
        return AjaxService.Put(endpoint, { dataTypeFieldDef: dataTypeFieldDef }, {});
    }
    
    static DeleteDataTypeFieldDef(dataTypeFieldDefId) {
        return AjaxService.Delete(endpoint + "?dataTypeFieldDefId=" + dataTypeFieldDefId, {}, {});
    }
}