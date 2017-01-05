import AjaxService from './AjaxService.jsx';

var endpoint = "/SiteVersions/Provision";

export default class SiteVersionProvisionService {
    static ExportSiteVersion(siteVersionId) {
        return AjaxService.Get(endpoint + "?siteVersionId=" + siteVersionId, {}, {});
    }
}