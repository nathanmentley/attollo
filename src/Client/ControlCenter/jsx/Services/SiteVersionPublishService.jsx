import AjaxService from './AjaxService.jsx';

var endpoint = "/SiteVersions/Publish";

export default class SiteVersionPublishService {
    static PublishSiteVersion(siteVersionId) {
        return AjaxService.Put(endpoint + "?siteVersionId=" + siteVersionId, {}, {});
    }
}