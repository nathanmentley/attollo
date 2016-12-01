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
					Attollo.Services.Page.GetPages(request.AuthContext, request.AuthContext.SiteVersionID)
				)
			}
		);
	};
	
	module.exports = new classDef();
})();