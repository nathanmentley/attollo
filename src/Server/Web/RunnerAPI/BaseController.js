export default class BaseController {
    constructor(attollo) {
        this._attollo = attollo;
    }

    get UrlEndpoint() { return ''; }

    GetLogic(request, response) {
        return new Promise(() => { reject({ message: "Unknown request." }); });
    }

    Setup(ControllerContext) {
        var self = this;

        ControllerContext.App.get(
            this.UrlEndpoint,
            ControllerContext.Auth.BuildContext(),
            (request, response) => {
                ControllerContext.ResponseProcessor(
                    request,
                    response,
                    self.GetLogic(request, response)
                )
            }
        );
	}
}