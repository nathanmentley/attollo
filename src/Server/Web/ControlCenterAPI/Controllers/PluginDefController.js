(function () {
	var classDef = function () {};

	var urlendpoint = '/PluginDefs';

	classDef.prototype.Setup = (controllerContext) => {
		controllerContext.App.get(
			urlendpoint,
			controllerContext.Auth(null),
			(request, response) => {
				controllerContext.ResponseProcessor(
					request,
					response,
					Attollo.Services.Plugin.GetPluginDefs(request.AuthContext)
				)
			}
		);
	};
	
	module.exports = new classDef();
})();