(function () {
	var classDef = function () {};

	var urlendpoint = '/Pages';

	classDef.prototype.Setup = (controllerContext) => {
		controllerContext.App.get(
			urlendpoint,
			controllerContext.Auth(null),
			(request, response) => {
				controllerContext.ResponseProcessor(
					request,
					response,
					Attollo.Services.Page.GetPages(request.AuthContext, request.query.siteVersionId)
				)
			}
		);
		controllerContext.App.post(
			urlendpoint,
			controllerContext.Auth(null),
			(request, response) => {
				controllerContext.ResponseProcessor(
					request,
					response,
					Attollo.Services.Page.AddPage(request.AuthContext, request.body.page)
				)
			}
		);
		controllerContext.App.put(
			urlendpoint,
			controllerContext.Auth(null),
			(request, response) => {
				controllerContext.ResponseProcessor(
					request,
					response,
					Attollo.Services.Page.UpdatePage(request.AuthContext, request.body.page)
				)
			}
		);
		controllerContext.App.delete(
			urlendpoint,
			controllerContext.Auth(null),
			(request, response) => {
				controllerContext.ResponseProcessor(
					request,
					response,
					Attollo.Services.Page.DeletePage(request.AuthContext, { id: request.query.pageId })
				)
			}
		);
	};
	
	module.exports = new classDef();
})();