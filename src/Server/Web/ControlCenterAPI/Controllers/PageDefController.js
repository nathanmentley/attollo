(function () {
	var classDef = function () {};

	var urlendpoint = '/PageDefs';

	classDef.prototype.Setup = (controllerContext) => {
		controllerContext.App.get(
			urlendpoint,
			controllerContext.Auth(null),
			(request, response) => {
				controllerContext.ResponseProcessor(
					request,
					response,
					Attollo.Services.Page.GetPageDefs(request.AuthContext)
				)
			}
		);
	};
	
	module.exports = new classDef();
})();