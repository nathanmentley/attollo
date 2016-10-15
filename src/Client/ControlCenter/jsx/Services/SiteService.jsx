import AjaxService from './AjaxService.jsx';

var endpoint = "/Sites";

export default class SiteService {
    static GetSites() {
        return AjaxService.Get(endpoint, {}, {});
    }
}