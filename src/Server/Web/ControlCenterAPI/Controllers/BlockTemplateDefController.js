(function () {
	var classDef = function () {};

	var urlendpoint = '/BlockTemplateDefs';

	classDef.prototype.Setup = (controllerContext) => {
		controllerContext.App.get(
			urlendpoint,
			controllerContext.Auth(null),
			(request, response) => {
				controllerContext.ResponseProcessor(
					request,
					response,
					Attollo.Services.Block.GetBlockTemplateDefs(request.AuthContext)
				)
			}
		);
	};
	
	module.exports = new classDef();
})();