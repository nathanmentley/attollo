(function () {
	var classDef = function () {};

	var urlendpoint = '/BlockContainerDefs';

	classDef.prototype.Setup = (controllerContext) => {
		controllerContext.App.get(
			urlendpoint,
			controllerContext.Auth(null),
			(request, response) => {
				controllerContext.ResponseProcessor(
					request,
					response,
					Attollo.Services.Block.GetBlockContainerDefs(request.AuthContext)
				)
			}
		);
	};
	
	module.exports = new classDef();
})();