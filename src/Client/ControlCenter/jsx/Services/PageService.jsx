import AjaxService from './AjaxService.jsx';

var endpoint = "/Pages";

export default class PageService {
    static GetPages(siteId) {
        return AjaxService.Get(endpoint + "?siteId=" + siteId, {}, {});
    }
}