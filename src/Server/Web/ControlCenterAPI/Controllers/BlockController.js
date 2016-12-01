(function () {
	var classDef = function () {};

	var urlendpoint = '/Blocks';

	classDef.prototype.Setup = (controllerContext) => {
		controllerContext.App.get(
			urlendpoint,
			controllerContext.Auth(null),
			(request, response) => {
				controllerContext.ResponseProcessor(
					request,
					response,
					Attollo.Services.Block.GetBlocks(request.AuthContext, request.query.blockContainerId)
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
					Attollo.Services.Block.AddBlock(
						request.AuthContext, request.body.blockContainerId, request.body.areaCode,
						request.body.code, request.body.templateCode
					)
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
					Attollo.Services.Block.UpdateBlock(request.AuthContext, request.body.block)
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
					Attollo.Services.Block.DeleteBlock(request.AuthContext, { id: request.query.blockId })
				)
			}
		);
	};
	
	module.exports = new classDef();
})();