(function () {
	var classDef = function () {};

	var urlendpoint = '/DataTypeDefs';

	classDef.prototype.Setup = (controllerContext) => {
		controllerContext.App.get(
			urlendpoint,
			controllerContext.Auth(null),
			(request, response) => {
				controllerContext.ResponseProcessor(
					request,
					response,
					Attollo.Services.DataType.GetDataTypeDefs(request.AuthContext)
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
					Attollo.Services.DataType.AddDataTypeDef(request.AuthContext, request.body.dataTypeDef)
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
					Attollo.Services.DataType.UpdateDataTypeDef(request.AuthContext, request.body.dataTypeDef)
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
					Attollo.Services.DataType.DeleteDataTypeDef(request.AuthContext, { id: request.query.dataTypeDefId })
				)
			}
		);
	};
	
	module.exports = new classDef();
})();