import AjaxService from './AjaxService.jsx';

var endpoint = "/DataTypeFieldTypes";

export default class DataTypeFieldDefService {
    static GetDataTypeFieldTypes(dataTypeDefId) {
        return AjaxService.Get(endpoint, {}, {});
    }
}