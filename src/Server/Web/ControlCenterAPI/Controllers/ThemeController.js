(function () {
	var classDef = function () {};

	var urlendpoint = '/Themes';

	classDef.prototype.Setup = (controllerContext) => {
		controllerContext.App.get(
			urlendpoint,
			controllerContext.Auth(null),
			(request, response) => {
				controllerContext.ResponseProcessor(
					request,
					response,
					Attollo.Services.Theme.GetThemes(request.AuthContext)
				)
			}
		);
	};
	
	module.exports = new classDef();
})();