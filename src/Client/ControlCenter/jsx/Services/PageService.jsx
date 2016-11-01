import AjaxService from './AjaxService.jsx';

var endpoint = "/Pages";

export default class PageService {
    static GetPages(siteVersionId) {
        return AjaxService.Get(endpoint + "?siteVersionId=" + siteVersionId, {}, {});
    }

    static AddPage(page) {
        return AjaxService.Post(endpoint, { page: page }, {});
    }

    static SavePage(page) {
        return AjaxService.Put(endpoint, { page: page }, {});
    }
    
    static DeletePage(pageId) {
        return AjaxService.Delete(endpoint + "?pageId=" + pageId, {}, {});
    }
}