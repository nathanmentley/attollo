export default class BaseController {
    static get UrlEndpoint() { return ''; }
    static get HasAuth() { return true; }

    static get GetPermission() { return null; }
    static get PostPermission() { return null; }
    static get PutPermission() { return null; }
    static get DeletePermission() { return null; }

    static GetLogic(request, response) {
        return new Promise(() => { reject({ message: "Unknown request." }); });
    }
    static PostLogic(request, response) {
        return new Promise(() => { reject({ message: "Unknown request." }); });
    }
    static PutLogic(request, response) {
        return new Promise(() => { reject({ message: "Unknown request." }); });
    }
    static DeleteLogic(request, response) {
        return new Promise(() => { reject({ message: "Unknown request." }); });
    }

    static Setup(ControllerContext) {
        var self = this;

        if(this.HasAuth) {
            ControllerContext.App.get(
                this.UrlEndpoint,
                ControllerContext.Auth.BuildContext(this.GetPermission),
                (request, response) => {
                    ControllerContext.ResponseProcessor(
                        request,
                        response,
                        self.GetLogic(request, response)
                    );
                }
            );

            ControllerContext.App.post(
                this.UrlEndpoint,
                ControllerContext.Auth.BuildContext(this.PostPermission),
                (request, response) => {
                    ControllerContext.ResponseProcessor(
                        request,
                        response,
                        self.PostLogic(request, response)
                    );
                }
            );

            ControllerContext.App.put(
                this.UrlEndpoint,
                ControllerContext.Auth.BuildContext(this.PutPermission),
                (request, response) => {
                    ControllerContext.ResponseProcessor(
                        request,
                        response,
                        self.PutLogic(request, response)
                    );
                }
            );

            ControllerContext.App.delete(
                this.UrlEndpoint,
                ControllerContext.Auth.BuildContext(this.DeletePermission),
                (request, response) => {
                    ControllerContext.ResponseProcessor(
                        request,
                        response,
                        self.DeleteLogic(request, response)
                    );
                }
            );
        } else {
            ControllerContext.App.get(
                this.UrlEndpoint,
                (request, response) => {
                    ControllerContext.ResponseProcessor(
                        request,
                        response,
                        self.GetLogic(request, response)
                    );
                }
            );

            ControllerContext.App.post(
                this.UrlEndpoint,
                (request, response) => {
                    ControllerContext.ResponseProcessor(
                        request,
                        response,
                        self.PostLogic(request, response)
                    );
                }
            );

            ControllerContext.App.put(
                this.UrlEndpoint,
                (request, response) => {
                    ControllerContext.ResponseProcessor(
                        request,
                        response,
                        self.PutLogic(request, response)
                    );
                }
            );

            ControllerContext.App.delete(
                this.UrlEndpoint,
                (request, response) => {
                    ControllerContext.ResponseProcessor(
                        request,
                        response,
                        self.DeleteLogic(request, response)
                    );
                }
            );
        }
    }
}