import AjaxService from './AjaxService.jsx';

var endpoint = "/Sites";

export default class SiteService {
    static GetSites() {
        return AjaxService.Get(endpoint, {}, {});
    }

    static AddSite() {
        return AjaxService.Post(endpoint, {}, {});
    }

    static SaveSite(site) {
        return AjaxService.Put(endpoint, { site: site }, {});
    }
    
    static DeleteSite(siteId) {
        return AjaxService.Delete(endpoint + "?siteId=" + siteId, {}, {});
    }
}