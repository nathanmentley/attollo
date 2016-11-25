import AjaxService from './AjaxService.jsx';

var endpoint = "/DataTypes";

export default class DataTypeService {
    static GetDataTypes() {
        return AjaxService.Get(endpoint, {}, {});
    }
}