import AjaxService from './AjaxService.jsx';

var endpoint = "/Pages";

export default class PageService {
    static GetPages() {
        return AjaxService.Get(endpoint, {}, {});
    }
}