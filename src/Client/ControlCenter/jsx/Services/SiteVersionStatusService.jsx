import AjaxService from './AjaxService.jsx';

var endpoint = "/SiteVersionStatuses";

export default class SiteVersionService {
    static GetSiteVersionStatuses() {
        return AjaxService.Get(endpoint, {}, {});
    }
}