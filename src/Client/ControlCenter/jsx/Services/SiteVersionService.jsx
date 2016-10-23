import AjaxService from './AjaxService.jsx';

var endpoint = "/SiteVersions";

export default class SiteVersionService {
    static GetSiteVersions(siteId) {
        return AjaxService.Get(endpoint + "?siteId=" + siteId, {}, {});
    }
}