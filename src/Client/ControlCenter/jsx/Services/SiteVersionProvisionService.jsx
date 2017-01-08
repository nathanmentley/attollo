import AjaxService from './AjaxService.jsx';

var endpoint = "/SiteVersions/Provision";

export default class SiteVersionProvisionService {
    static ExportSiteVersion(siteVersionId) {
        return AjaxService.Get(endpoint + "?siteVersionId=" + siteVersionId, {}, {});
    }

    static CloneSiteVersion(siteVersionId, siteId) {
        return AjaxService.Put(endpoint + "?siteVersionId=" + siteVersionId + "&siteId=" + siteId, {}, {});
    }

    static ImportSiteVersion(siteVersion, siteId) {
        return AjaxService.Post(endpoint, { siteVersion: siteVersion, siteId: siteId }, {});
    }
}