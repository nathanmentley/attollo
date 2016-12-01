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
	};
	
	module.exports = new classDef();
})();