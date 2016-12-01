(function () {
	var classDef = function () {};

	var urlendpoint = '/BlockCssRules';

	classDef.prototype.Setup = (controllerContext) => {
		controllerContext.App.get(
			urlendpoint,
			controllerContext.Auth(null),
			(request, response) => {
				controllerContext.ResponseProcessor(
					request,
					response,
					Attollo.Services.Css.GetBlockCssRules(request.AuthContext, request.query.blockId)
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
					Attollo.Services.Css.UpdateBlockCssRules(request.AuthContext, request.body.rules)
				)
			}
		);
	};
	
	module.exports = new classDef();
})();