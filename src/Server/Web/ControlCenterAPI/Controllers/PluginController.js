(function () {
	var classDef = function () {};

	var urlendpoint = '/Plugins';

	classDef.prototype.Setup = (controllerContext) => {
		controllerContext.App.get(
			urlendpoint,
			controllerContext.Auth(null),
			(request, response) => {
				controllerContext.ResponseProcessor(
					request,
					response,
					Attollo.Services.Plugin.GetPlugins(request.AuthContext)
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
					Attollo.Services.Plugin.AddPlugin(request.AuthContext, request.body.pluginDefCode)
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
					Attollo.Services.Plugin.DeletePlugin(request.AuthContext, { id: request.query.pluginId })
				)
			}
		);
	};
	
	module.exports = new classDef();
})();