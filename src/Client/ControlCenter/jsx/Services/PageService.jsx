import AjaxService from './AjaxService.jsx';

var endpoint = "/Pages";

export default class PageService {
    static GetPages(siteId) {
        return AjaxService.Get(endpoint + "?siteId=" + siteId, {}, {});
    }

    static AddPage(siteId) {
        return AjaxService.Post(endpoint, { siteId: siteId }, {});
    }

    static SavePage(page) {
        return AjaxService.Put(endpoint, { page: page }, {});
    }
    
    static DeletePage(pageId) {
        return AjaxService.Delete(endpoint + "?pageId=" + pageId, {}, {});
    }
}