(function () {
	var classDef = function () {};

	var urlendpoint = '/BlockDefs';

	classDef.prototype.Setup = (controllerContext) => {
		controllerContext.App.get(
			urlendpoint,
			controllerContext.Auth(null),
			(request, response) => {
				controllerContext.ResponseProcessor(
					request,
					response,
					Attollo.Services.Block.GetBlockDefs(request.AuthContext, request.query.pageDefId)
				)
			}
		);
	};
	
	module.exports = new classDef();
})();