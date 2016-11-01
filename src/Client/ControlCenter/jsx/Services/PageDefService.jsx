import AjaxService from './AjaxService.jsx';

var endpoint = "/PageDefs";

export default class PageDefService {
    static GetPageDefs() {
        return AjaxService.Get(endpoint, {}, {});
    }
}