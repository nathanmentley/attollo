(function () {
	var classDef = function () {};

	var urlendpoint = '/CssRuleDefs';

	classDef.prototype.Setup = (controllerContext) => {
		controllerContext.App.get(
			urlendpoint,
			controllerContext.Auth(null),
			(request, response) => {
				controllerContext.ResponseProcessor(
					request,
					response,
					Attollo.Services.Css.GetCssRuleDefs(request.AuthContext)
				)
			}
		);
	};
	
	module.exports = new classDef();
})();