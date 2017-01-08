export default class BaseController {
    get UrlEndpoint() { return ''; }
    get HasAuth() { return true; }

    get GetPermission() { return null; }
    get PostPermission() { return null; }
    get PutPermission() { return null; }
    get DeletePermission() { return null; }

    constructor(attollo) {
        this._attollo = attollo;
    }

    get Attollo() {
        return this._attollo;
    }

    GetLogic(request, response) {
        return new Promise(() => { reject({ message: "Unknown request." }); });
    }
    PostLogic(request, response) {
        return new Promise(() => { reject({ message: "Unknown request." }); });
    }
    PutLogic(request, response) {
        return new Promise(() => { reject({ message: "Unknown request." }); });
    }
    DeleteLogic(request, response) {
        return new Promise(() => { reject({ message: "Unknown request." }); });
    }

    Setup(ControllerContext) {
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