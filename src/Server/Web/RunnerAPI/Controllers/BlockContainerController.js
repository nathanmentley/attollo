(function () {
	var classDef = function () {};

	var urlendpoint = '/BlockContainers';

	classDef.prototype.Setup = (controllerContext) => {
		controllerContext.App.get(
			urlendpoint,
			controllerContext.Auth(null),
			(request, response) => {
				controllerContext.ResponseProcessor(
					request,
					response,
					Attollo.Services.Block.GetBlockContainers(request.AuthContext, request.query.pageId)
				)
			}
		);
	};
	
	module.exports = new classDef();
})();