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
		controllerContext.App.post(
			urlendpoint,
			controllerContext.Auth(null),
			(request, response) => {
				controllerContext.ResponseProcessor(
					request,
					response,
					Attollo.Services.Block.AddBlockContainers(request.AuthContext, request.body.pageId, request.body.code)
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
					Attollo.Services.Block.UpdateBlockContainer(request.AuthContext, request.body.blockContainer)
				)
			}
		);
	};
	
	module.exports = new classDef();
})();