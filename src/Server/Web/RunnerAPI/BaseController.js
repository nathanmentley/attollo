export default class BaseController {
	static get UrlEndpoint() { return ''; }

    static GetLogic(request, response) {
        return new Promise(() => { reject({ message: "Unknown request." }); });
    }

	static Setup(ControllerContext) {
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