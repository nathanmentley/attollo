import AjaxService from './AjaxService.jsx';

var endpoint = "/Pages";

export default class PageService {
    static AddPage(url) {
        return AjaxService.Post(endpoint, { url: url }, {});
    }
}