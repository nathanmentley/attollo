import AjaxService from './AjaxService.jsx';

var endpoint = "/DataTypeFieldTypes";

export default class DataTypeFieldTypeService {
    static GetDataTypeFieldTypes(dataTypeDefId) {
        return AjaxService.Get(endpoint, {}, {});
    }
}