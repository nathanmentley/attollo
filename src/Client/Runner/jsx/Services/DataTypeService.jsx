import AjaxService from './AjaxService.jsx';

var endpoint = "/DataTypes";

export default class DataTypeService {
    static GetDataTypes(dataTypeDefId, filters) {
        return AjaxService.Get(endpoint + "?dataTypeDefId=" + dataTypeDefId + "&filters=" + filters, {}, {});
    }
}