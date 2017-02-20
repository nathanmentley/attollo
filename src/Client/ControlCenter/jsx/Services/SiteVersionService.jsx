import AjaxService from './AjaxService.jsx';

var endpoint = "/SiteVersions";

export default class SiteVersionService {
    static GetSiteVersions(siteId) {
        return AjaxService.Get(endpoint + "?siteId=" + siteId, {}, {});
    }

	static UpdateSiteVersion(siteVersion) {
		return AjaxService.Put(endpoint, { siteVersion: siteVersion }, {});
	}

	static DeleteSiteVersion(siteVersionId) {
		return AjaxService.Delete(endpoint + "?siteVersionId=" + siteVersionId, {}, {});
	}
}