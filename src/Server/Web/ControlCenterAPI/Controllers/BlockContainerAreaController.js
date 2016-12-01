(function () {
	var classDef = function () {};

	var urlendpoint = '/BlockContainerAreas';

	classDef.prototype.Setup = (controllerContext) => {
		controllerContext.App.get(
			urlendpoint,
			controllerContext.Auth(null),
			(request, response) => {
				controllerContext.ResponseProcessor(
					request,
					response,
					Attollo.Services.Block.GetBlockContainerArea(request.AuthContext, request.query.blockContainerId, request.query.areaCode)
				)
			}
		);
	};
	
	module.exports = new classDef();
})();