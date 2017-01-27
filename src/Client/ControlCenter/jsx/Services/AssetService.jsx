import AjaxService from './AjaxService.jsx';

var endpoint = "/Assets";

export default class AssetService {
    static GetDirectoryListing() {
        return AjaxService.Get(endpoint, {}, {});
    }

    static AddAsset(filename, content) {
        return AjaxService.Post(endpoint, { filename: filename, content: content }, {});
    }

    static DeleteAsset(filename) {
        return AjaxService.Delete(endpoint + "?filename=" + filename, {}, {});
    }
}